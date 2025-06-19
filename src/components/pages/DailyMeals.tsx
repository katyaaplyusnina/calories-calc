import React, { useEffect, useCallback } from 'react';
import { Table, Button, DatePicker, Modal, Form, InputNumber, Select, Card, Space, Spin, Alert, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { IDailyMeal } from "../../types/DailyMeal";
import DailyProgress from "../DailyProgress";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchDailyMeals, addDailyMeal, deleteDailyMeal } from '../../store/dailyMealsSlice';
import { fetchProducts } from '../../store/productsSlice';

const { Option } = Select;
const { Title, Paragraph } = Typography;

const DailyMealsPage: React.FC = () => {
    const [selectedDate, setSelectedDate] = React.useState<string>(dayjs().format('YYYY-MM-DD'));
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [form] = Form.useForm();

    const dispatch = useDispatch<AppDispatch>();
    const { items: meals, loading: mealsLoading, error: mealsError } = useSelector((state: RootState) => state.dailyMeals);
    const { items: products, loading: productsLoading, error: productsError } = useSelector((state: RootState) => state.products);

    // Загрузка данных
    useEffect(() => {
        dispatch(fetchDailyMeals(selectedDate));
        dispatch(fetchProducts());
    }, [dispatch, selectedDate]);

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
                const calories = (product.protein * 4 + product.fat * 9 + product.carbs * 4) * record.weight / 100;
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
            await dispatch(addDailyMeal(newMeal)).unwrap();
            handleCancel();
        } catch (error) {
            console.error(error)
        }
    };

    const handleDelete = useCallback(async (id: number) => {
        await dispatch(deleteDailyMeal(id));
    }, [dispatch]);

    const handleProductSelect = (productId: number) => {
        const selectedProduct = products.find(p => p.id === productId);
        if (selectedProduct) {
            form.setFieldsValue({
                weight: selectedProduct.defaultWeight
            });
        }
    };

    return (
        <div>
            <div style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '24px',
                borderRadius: '12px',
                marginBottom: '24px',
                color: '#fff'
            }}>
                <Title level={2} style={{ color: '#fff', margin: 0, marginBottom: '8px' }}>
                    Дневник питания
                </Title>
                <Paragraph style={{ color: '#fff', margin: 0, fontSize: '16px', opacity: 0.9 }}>
                    Отслеживайте свой дневной рацион и контролируйте потребление калорий
                </Paragraph>
            </div>

            <Card>
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
                {(mealsLoading || productsLoading) && <Spin style={{ marginBottom: 16 }} />}
                {mealsError && <Alert type="error" message={mealsError} style={{ marginBottom: 16 }} />}
                {productsError && <Alert type="error" message={productsError} style={{ marginBottom: 16 }} />}
                <Table
                    columns={columns}
                    dataSource={meals}
                    rowKey="id"
                    loading={mealsLoading}
                    pagination={false}
                />

                <DailyProgress meals={meals} products={products} />
            </Card>

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
        </div>
    );
};

export default DailyMealsPage;