import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { IAuthData } from '../../types/user';
import { login } from '../../services/auth.service';
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (values: IAuthData) => {
        try {
            setLoading(true);
            const { token } = await login(values);

            localStorage.setItem('authToken', token);

            navigate('/');

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onFinish={handleSubmit} layout="vertical">
            <Form.Item
                name="login"
                label="Логин"
                rules={[
                    { required: true, message: 'Введите логин' },
                    { type: 'string' },
                ]}
            >
                <Input placeholder="username" />
            </Form.Item>

            <Form.Item
                name="password"
                label="Пароль"
                rules={[{ required: true, message: 'Введите пароль' }]}
            >
                <Input.Password placeholder="Пароль" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
