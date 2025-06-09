import React, { useState, useEffect } from 'react';
import {
    Button,
    Form,
    InputNumber,
    Table,
    Modal,
    Space,
    message,
    Input
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IProduct } from '../../types/product';

const { Search } = Input;

const ProductCatalog: React.FC = () => {
    const [form] = Form.useForm();
    const [products, setProducts] = useState<IProduct[]>(() => {
        const saved = localStorage.getItem('products');
        return saved ? JSON.parse(saved) : [];
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    const columns: ColumnsType<IProduct> = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Калории (ккал)',
            dataIndex: 'calories',
            key: 'calories',
            align: 'center',
            sorter: (a, b) => a.calories - b.calories,
        },
        {
            title: 'Белки (г)',
            dataIndex: 'proteins',
            key: 'proteins',
            align: 'center',
            sorter: (a, b) => a.proteins - b.proteins,
        },
        {
            title: 'Жиры (г)',
            dataIndex: 'fats',
            key: 'fats',
            align: 'center',
            sorter: (a, b) => a.fats - b.fats,
        },
        {
            title: 'Углеводы (г)',
            dataIndex: 'carbohydrates',
            key: 'carbohydrates',
            align: 'center',
            sorter: (a, b) => a.carbohydrates - b.carbohydrates,
        },
        {
            title: 'Дефолтный вес (г)',
            dataIndex: 'defaultWeight',
            key: 'defaultWeight',
            align: 'center',
            sorter: (a, b) => a.defaultWeight - b.defaultWeight,
        },
        {
            title: 'Действия',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Редактировать
                    </Button>
                    <Button type="link" danger onClick={() => handleDelete(record.id)}>
                        Удалить
                    </Button>
                </Space>
            ),
        },
    ];

    const showModal = () => {
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                const editedId = form.getFieldValue('id');

                if (editedId) {
                    setProducts(products.map(product =>
                        product.id === editedId ? { ...values, id: editedId } : product
                    ));
                    message.success('Продукт успешно обновлен');
                } else {
                    const newProduct: IProduct = {
                        ...values,
                        id: Date.now().toString(),
                    };
                    setProducts([...products, newProduct]);
                    message.success('Продукт успешно добавлен');
                }

                handleCancel();
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const handleEdit = (product: IProduct) => {
        form.setFieldsValue(product);
        setIsModalVisible(true);
    };

    const handleDelete = (id: string) => {
        setProducts(products.filter((product) => product.id !== id));
        message.success('Продукт успешно удален');
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <div style={{ display: 'flex', marginBottom: 16, gap: 16 }}>
                <Search
                    placeholder="Поиск по названию"
                    allowClear
                    enterButton="Найти"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 300 }}
                />
                <Button type="primary" onClick={showModal}>
                    Добавить продукт
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={filteredProducts}
                rowKey="id"
                bordered
                pagination={{ pageSize: 10 }}
            />

            <Modal
                title={form.getFieldValue('id') ? 'Редактировать продукт' : 'Добавить продукт'}
                open={isModalVisible}
                onOk={handleSubmit}
                onCancel={handleCancel}
                okText={form.getFieldValue('id') ? 'Обновить' : 'Добавить'}
                cancelText="Отмена"
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="id" hidden>
                        <Input type="hidden" />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        label="Название продукта"
                        rules={[
                            { required: true, message: 'Пожалуйста, введите название продукта' },
                            { max: 50, message: 'Название не должно превышать 50 символов' }
                        ]}
                    >
                        <Input placeholder="Например: Яблоко" />
                    </Form.Item>

                    <Form.Item
                        name="calories"
                        label="Калории (ккал на 100г)"
                        rules={[
                            { required: true, message: 'Пожалуйста, укажите калорийность' },
                            { type: 'number', min: 0, message: 'Калории не могут быть отрицательными' },
                            { type: 'number', max: 1000, message: 'Слишком большое значение' }
                        ]}
                    >
                        <InputNumber min={0} max={1000} step={1} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="proteins"
                        label="Белки (г на 100г)"
                        rules={[
                            { required: true, message: 'Пожалуйста, укажите содержание белков' },
                            { type: 'number', min: 0, message: 'Не может быть отрицательным' }
                        ]}
                    >
                        <InputNumber min={0} step={0.1} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="fats"
                        label="Жиры (г на 100г)"
                        rules={[
                            { required: true, message: 'Пожалуйста, укажите содержание жиров' },
                            { type: 'number', min: 0, message: 'Не может быть отрицательным' }
                        ]}
                    >
                        <InputNumber min={0} step={0.1} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="carbohydrates"
                        label="Углеводы (г на 100г)"
                        rules={[
                            { required: true, message: 'Пожалуйста, укажите содержание углеводов' },
                            { type: 'number', min: 0, message: 'Не может быть отрицательным' }
                        ]}
                    >
                        <InputNumber min={0} step={0.1} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="defaultWeight"
                        label="Дефолтный вес (г)"
                        rules={[
                            { required: true, message: 'Пожалуйста, укажите стандартный вес порции' },
                            { type: 'number', min: 1, message: 'Минимальный вес 1г' }
                        ]}
                    >
                        <InputNumber min={1} step={1} style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductCatalog;