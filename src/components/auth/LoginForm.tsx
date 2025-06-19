import React, { useEffect } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { IAuthData } from '../../types/user';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authSlice';
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from '../../store';

const LoginForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading, error, token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    const handleSubmit = async (values: IAuthData) => {
        await dispatch(login(values));
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

            {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
