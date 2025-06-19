import React, { useEffect } from 'react';
import { Form, InputNumber, Radio, Button, Card, Typography, Slider, Spin, Alert } from 'antd';
import { IUserSettings } from '../../types/UserSettings';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchUserSettings, updateUserSettings } from '../../store/userSettingsSlice';

const { Title, Paragraph } = Typography;

const activityLevelMarks = {
    1.2: 'Минимальный',
    1.375: 'Низкий',
    1.55: 'Умеренный',
    1.725: 'Высокий',
    1.9: 'Экстра'
};

const Settings: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const { data: initialValues, loading, error } = useSelector((state: RootState) => state.userSettings);

    useEffect(() => {
        dispatch(fetchUserSettings());
    }, [dispatch]);

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [initialValues, form]);

    const onFinish = (values: IUserSettings) => {
        dispatch(updateUserSettings(values));
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
                    Персональные настройки
                </Title>
                <Paragraph style={{ color: '#fff', margin: 0, fontSize: '16px', opacity: 0.9 }}>
                    Настройте свои параметры для точного расчета калорий и целей
                </Paragraph>
            </div>

            <Card style={{ maxWidth: 600 }}>
                {loading && <Spin style={{ marginBottom: 16 }} />}
                {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={initialValues ?? {
                        gender: 'male',
                        goal: 'maintain',
                        activityLevel: 1.375
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Пол"
                        name="gender"
                        rules={[{ required: true }]}
                    >
                        <Radio.Group>
                            <Radio value="male">Мужской</Radio>
                            <Radio value="female">Женский</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="Возраст"
                        name="age"
                        rules={[{ required: true, message: 'Укажите возраст' }]}
                    >
                        <InputNumber min={14} max={100} />
                    </Form.Item>

                    <Form.Item
                        label="Вес (кг)"
                        name="weight"
                        rules={[{ required: true, message: 'Укажите вес' }]}
                    >
                        <InputNumber min={30} max={200} step={0.1} />
                    </Form.Item>

                    <Form.Item
                        label="Рост (см)"
                        name="height"
                        rules={[{ required: true, message: 'Укажите рост' }]}
                    >
                        <InputNumber min={120} max={250} />
                    </Form.Item>

                    <Form.Item
                        label="Цель"
                        name="goal"
                        rules={[{ required: true }]}
                    >
                        <Radio.Group>
                            <Radio value="loss">Снижение веса</Radio>
                            <Radio value="maintain">Поддержание веса</Radio>
                            <Radio value="gain">Набор массы</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="Уровень активности"
                        name="activityLevel"
                        rules={[{ required: true }]}
                    >
                        <Slider
                            min={1.2}
                            max={1.9}
                            step={0.05}
                            marks={activityLevelMarks}
                            tipFormatter={(value) => value?.toFixed(2)}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Сохранить настройки
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Settings;