import React, { useEffect } from 'react';
import { Form, Input, Button, Alert, Card, Typography } from 'antd';
import { IAuthData } from '../../types/user';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authSlice';
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from '../../store';

const { Title } = Typography;

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
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '20px'
        }}>
            <Card
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    borderRadius: '12px',
                    border: 'none'
                }}
                bodyStyle={{ padding: '32px' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
                        Вход в систему
                    </Title>
                    <p style={{ color: '#666', margin: '8px 0 0 0' }}>
                        Введите ваши учетные данные
                    </p>
                </div>

                <Form onFinish={handleSubmit} layout="vertical" size="large">
                    <Form.Item
                        name="login"
                        label="Логин"
                        rules={[
                            { required: true, message: 'Введите логин' },
                            { type: 'string' },
                        ]}
                    >
                        <Input 
                            placeholder="Введите ваш логин" 
                            prefix={<span style={{ color: '#bfbfbf' }}>👤</span>}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[{ required: true, message: 'Введите пароль' }]}
                    >
                        <Input.Password 
                            placeholder="Введите ваш пароль"
                            prefix={<span style={{ color: '#bfbfbf' }}>🔒</span>}
                        />
                    </Form.Item>

                    {error && (
                        <Alert 
                            type="error" 
                            message={error} 
                            style={{ marginBottom: 16, borderRadius: '8px' }} 
                        />
                    )}

                    <Form.Item style={{ marginBottom: 0 }}>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            loading={loading} 
                            block
                            size="large"
                            style={{
                                height: '48px',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: '500'
                            }}
                        >
                            {loading ? 'Вход...' : 'Войти'}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default LoginForm;
