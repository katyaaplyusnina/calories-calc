import React, { useState, useEffect } from 'react';
import { Form, InputNumber, Radio, Button, Card, Typography, Slider } from 'antd';
import { IUserSettings } from '../../types/UserSettings';

const { Title } = Typography;

const activityLevelMarks = {
    1.2: 'Минимальный',
    1.375: 'Низкий',
    1.55: 'Умеренный',
    1.725: 'Высокий',
    1.9: 'Экстра'
};

const Settings: React.FC = () => {
    const [form] = Form.useForm();
    const [initialValues, setInitialValues] = useState<IUserSettings | null>(null);

    // Загрузка сохраненных настроек при монтировании
    useEffect(() => {
        const savedSettings = localStorage.getItem('userSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            setInitialValues(settings);
            form.setFieldsValue(settings);
        }
    }, [form]);

    const onFinish = (values: IUserSettings) => {
        localStorage.setItem('userSettings', JSON.stringify(values));
    };

    return (
        <Card title={<Title level={4}>Персональные настройки</Title>} style={{ maxWidth: 600 }}>
            <Form
                form={form}
                layout="vertical"
                initialValues={initialValues || {
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
                        <Radio value="lose">Снижение веса</Radio>
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
                    <Button type="primary" htmlType="submit">
                        Сохранить настройки
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Settings;