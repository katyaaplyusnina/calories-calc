import React, { useState, useEffect } from 'react';
import { Table, Button, DatePicker, Modal, Form, InputNumber, Select, message, Card, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { IDailyMeal } from "../../types/DailyMeal";
import { IProduct } from "../../types/Product";
import DailyMealsService from "../../services/daily-meals.service";
import ProductService from "../../services/product.service";
import Utils from "../../utils/Utils";
import DailyProgress from "../DailyProgress";

const { RangePicker } = DatePicker;
const { Option } = Select;

const DailyMealsPage: React.FC = () => {
    const [meals, setMeals] = useState<IDailyMeal[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    // Загрузка данных
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [mealsData, productsData] = await Promise.all([
                    DailyMealsService.getByDate(selectedDate),
                    ProductService.getAll(),
                ]);
                setMeals(mealsData);
                setProducts(productsData);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedDate]);

    // Колонки таблицы
    const columns: ColumnsType<IDailyMeal> = [
        {
            title: 'Продукт',
            key: 'name',
            render: (_, record) => {
                const product = products.find(p => p.id === record.productId);

                return product?.name ?? 'Неизвестный продукт';
            }
        },
        {
            title: 'Вес (г)',
            dataIndex: 'weight',
            key: 'weight',
            align: 'center',
        },
        {
            title: 'Белки',
            key: 'protein',
            align: 'center',
            render: (_, record) => {
                const product = products.find(p => p.id === record.productId);
                return product ? (product.protein * record.weight / 100).toFixed(1) : '—';
            }
        },
        {
            title: 'Жиры',
            key: 'fat',
            align: 'center',
            render: (_, record) => {
                const product = products.find(p => p.id === record.productId);
                return product ? (product.fat * record.weight / 100).toFixed(1) : '—';
            }
        },
        {
            title: 'Углеводы',
            key: 'carbs',
            align: 'center',
            render: (_, record) => {
                const product = products.find(p => p.id === record.productId);

                return product ? (product.carbs * record.weight / 100).toFixed(1) : '—';
            }
        },
        {
            title: 'Калории',
            key: 'calories',
            align: 'center',
            render: (_, record) => {
                const product = products.find(p => p.id === record.productId);
                if (!product) return '—';
                const calories = Utils.getCalories(product) * record.weight / 100;

                return Math.round(calories);
            }
        },
        {
            title: 'Действия',
            key: 'action',
            render: (_, record) => (
                <Button type="link" danger onClick={() => handleDelete(record.id!)}>
                    Удалить
                </Button>
            ),
        },
    ];

    // Обработчики
    const handleDateChange = (date: dayjs.Dayjs | null) => {
        if (date) {
            setSelectedDate(date.format('YYYY-MM-DD'));
        }
    };

    const showModal = () => {
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const newMeal: Omit<IDailyMeal, 'id'> = {
                productId: values.productId,
                weight: values.weight,
                date: selectedDate,
            };

            const createdMeal = await DailyMealsService.create(newMeal);
            setMeals([...meals, createdMeal]);
            handleCancel();
        } catch (error) {
            console.error(error)
        }
    };

    const handleDelete = async (id: number) => {

        await DailyMealsService.delete(id);

        setMeals(meals.filter(meal => meal.id !== id));
    };

    const handleProductSelect = (productId: number) => {
        const selectedProduct = products.find(p => p.id === productId);
        if (selectedProduct) {
            form.setFieldsValue({
                weight: selectedProduct.defaultWeight
            });
        }
    };

    return (
        <Card title="Дневник питания">
            <Space style={{ marginBottom: 16 }}>
                <DatePicker
                    value={dayjs(selectedDate)}
                    onChange={handleDateChange}
                    format="DD.MM.YYYY"
                />
                <Button type="primary" onClick={showModal}>
                    Добавить продукт
                </Button>
            </Space>

            <Table
                columns={columns}
                dataSource={meals}
                rowKey="id"
                loading={loading}
                pagination={false}
            />

            <Modal
                title="Добавить продукт"
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
                                String(option?.children).toLowerCase().includes(input.toLowerCase())
                            }
                            onChange={handleProductSelect}
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
                        label="Вес (г)"
                        rules={[{ required: true, message: 'Укажите вес' }]}
                    >
                        <InputNumber min={1} step={1} style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default DailyMealsPage;