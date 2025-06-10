import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, InputNumber, Select, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IMealItem, IDailyMeals } from '../../types/meal';
import { IProduct } from '../../types/product';

const { Option } = Select;

const DailyMeals: React.FC = () => {
    const [meals, setMeals] = useState<IDailyMeals>(() => {
        const saved = localStorage.getItem('dailyMeals');
        return saved ? JSON.parse(saved) : { date: new Date().toISOString().split('T')[0], items: [] };
    });

    const [products, setProducts] = useState<IProduct[]>(() => {
        const saved = localStorage.getItem('products');
        return saved ? JSON.parse(saved) : [];
    });

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        localStorage.setItem('dailyMeals', JSON.stringify(meals));
    }, [meals]);

    const columns: ColumnsType<IMealItem> = [
        {
            title: 'Продукт',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Вес (г)',
            dataIndex: 'weight',
            key: 'weight',
            align: 'center',
        },
        {
            title: 'Калории',
            dataIndex: 'calories',
            key: 'calories',
            align: 'center',
            render: (_, record) => Math.round(record.calories * record.weight / 100),
        },
        {
            title: 'Белки',
            dataIndex: 'proteins',
            key: 'proteins',
            align: 'center',
            render: (_, record) => (record.proteins * record.weight / 100).toFixed(1),
        },
        {
            title: 'Жиры',
            dataIndex: 'fats',
            key: 'fats',
            align: 'center',
            render: (_, record) => (record.fats * record.weight / 100).toFixed(1),
        },
        {
            title: 'Углеводы',
            dataIndex: 'carbohydrates',
            key: 'carbohydrates',
            align: 'center',
            render: (_, record) => (record.carbohydrates * record.weight / 100).toFixed(1),
        },
        {
            title: 'Действия',
            key: 'action',
            render: (_, record) => (
                <Button
                    type="link"
                    danger
                    onClick={() => handleDelete(record.id)}
                >
                    Удалить
                </Button>
            ),
        },
    ];

    const showModal = () => {
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleProductChange = (productId: string) => {
        const selectedProduct = products.find(p => p.id === productId);
        if (selectedProduct) {
            form.setFieldsValue({
                weight: selectedProduct.defaultWeight
            });
        }
    };

    const handleSubmit = () => {
        form.validateFields().then(values => {
            const selectedProduct = products.find(p => p.id === values.productId);

            if (selectedProduct) {
                const newMealItem: IMealItem = {
                    id: Date.now().toString(),
                    productId: selectedProduct.id,
                    name: selectedProduct.name,
                    weight: values.weight,
                    calories: selectedProduct.calories,
                    proteins: selectedProduct.proteins,
                    fats: selectedProduct.fats,
                    carbohydrates: selectedProduct.carbohydrates,
                };

                setMeals({
                    ...meals,
                    items: [...meals.items, newMealItem],
                });

                message.success('Продукт добавлен в дневной рацион');
                handleCancel();
            }
        });
    };

    const handleDelete = (id: string) => {
        setMeals({
            ...meals,
            items: meals.items.filter((item) => item.id !== id),
        });
        message.success('Продукт удален из рациона');
    };

    const calculateTotal = (field: keyof Pick<IMealItem, 'calories' | 'proteins' | 'fats' | 'carbohydrates'>) => {
        return meals.items.reduce((sum, item) => {
            return sum + (item[field] * item.weight / 100);
        }, 0);
    };

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={showModal}>
                    Добавить продукт
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={meals.items}
                rowKey="id"
                bordered
                pagination={false}
                summary={() => (
                    <Table.Summary fixed>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0}>Итого</Table.Summary.Cell>
                            <Table.Summary.Cell index={1} align="center">
                                {meals.items.reduce((sum, item) => sum + item.weight, 0)} г
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={2} align="center">
                                {Math.round(calculateTotal('calories'))} ккал
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={3} align="center">
                                {calculateTotal('proteins')} г
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={4} align="center">
                                {calculateTotal('fats').toFixed(1)} г
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={5} align="center">
                                {calculateTotal('carbohydrates').toFixed(1)} г
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={6}></Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                )}
            />

            <Modal
                title="Добавить продукт в дневной рацион"
                open={isModalVisible}
                onOk={handleSubmit}
                onCancel={handleCancel}
                okText="Добавить"
                cancelText="Отмена"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="productId"
                        label="Продукт"
                        rules={[{ required: true, message: 'Выберите продукт' }]}
                    >
                        <Select
                            placeholder="Выберите продукт"
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                String(option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            onChange={handleProductChange}
                        >
                            {products.map(product => (
                                <Option key={product.id} value={product.id}>
                                    {product.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="weight"
                        label="Вес (граммы)"
                        rules={[{ required: true, message: 'Укажите вес порции' }]}
                    >
                        <InputNumber
                            min={1}
                            step={1}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default DailyMeals;