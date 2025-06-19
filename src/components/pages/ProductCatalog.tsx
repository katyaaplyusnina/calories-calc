import React, { useEffect } from 'react';
import {
    Button,
    Form,
    InputNumber,
    Table,
    Modal,
    Space,
    Input, Checkbox, Spin, Alert
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IProduct } from '../../types/Product';
import Utils from '../../utils/Utils';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import {
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct
} from '../../store/productsSlice';

const { Search } = Input;

const ProductCatalog: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const { items: products, loading, error } = useSelector((state: RootState) => state.products);

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [searchText, setSearchText] = React.useState('');

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

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
            render: (_, r) => Utils.getCalories(r),
            sorter: (a, b) => Utils.getCalories(a) - Utils.getCalories(b),
        },
        {
            title: 'Белки (г)',
            dataIndex: 'protein',
            key: 'proteins',
            align: 'center',
            sorter: (a, b) => a.protein - b.protein,
        },
        {
            title: 'Жиры (г)',
            dataIndex: 'fat',
            key: 'fats',
            align: 'center',
            sorter: (a, b) => a.fat - b.fat,
        },
        {
            title: 'Углеводы (г)',
            dataIndex: 'carbs',
            key: 'carbohydrates',
            align: 'center',
            sorter: (a, b) => a.carbs - b.carbs,
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
                    <Button type="link" danger onClick={() => handleDelete(record.id!)}>
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

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const editedId = form.getFieldValue('id');

            if (editedId) {
                await dispatch(updateProduct({ id: editedId, product: values })).unwrap();
            } else {
                await dispatch(addProduct(values)).unwrap();
            }
            handleCancel();
        } catch (error) {
            // Ошибка уже обработана в слайсе
        }
    };

    const handleEdit = (product: IProduct) => {
        form.setFieldsValue(product);
        setIsModalVisible(true);
    };

    const handleDelete = async (id: number) => {
        await dispatch(deleteProduct(id));
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
            {loading && <Spin style={{ marginBottom: 16 }} />}
            {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}
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
                        name="protein"
                        label="Белки (г на 100г)"
                        rules={[
                            { required: true, message: 'Пожалуйста, укажите содержание белков' },
                            { type: 'number', min: 0, message: 'Не может быть отрицательным' }
                        ]}
                    >
                        <InputNumber min={0} step={0.1} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="fat"
                        label="Жиры (г на 100г)"
                        rules={[
                            { required: true, message: 'Пожалуйста, укажите содержание жиров' },
                            { type: 'number', min: 0, message: 'Не может быть отрицательным' }
                        ]}
                    >
                        <InputNumber min={0} step={0.1} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="carbs"
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

                    <Form.Item
                        name="isTrusted"
                        label="trusted"
                        valuePropName="checked"
                        rules={[
                            { type: 'boolean' }
                        ]}
                    >
                        <Checkbox style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductCatalog;