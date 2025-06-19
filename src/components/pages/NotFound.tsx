import React from "react";
import { Typography, Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

function NotFound() {
    const navigate = useNavigate();

    return (
        <div style={{
            minHeight: 'calc(100vh - 136px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px'
        }}>
            <div style={{ textAlign: 'center', color: '#fff' }}>
                <Title level={1} style={{ color: '#fff', margin: 0, fontSize: '120px', fontWeight: 'bold' }}>
                    404
                </Title>
                <Title level={2} style={{ color: '#fff', margin: '16px 0', fontWeight: '500' }}>
                    Страница не найдена
                </Title>
                <Paragraph style={{ color: '#fff', fontSize: '18px', margin: '16px 0 32px 0', opacity: 0.9 }}>
                    К сожалению, запрашиваемая страница не существует
                </Paragraph>
                <Button 
                    type="primary" 
                    size="large" 
                    icon={<HomeOutlined />}
                    onClick={() => navigate('/')}
                    style={{
                        height: '48px',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '500',
                        padding: '0 32px'
                    }}
                >
                    Вернуться на главную
                </Button>
            </div>
        </div>
    );
}

export default NotFound;