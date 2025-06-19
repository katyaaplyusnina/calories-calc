import React from "react";
import { Layout, Typography, Space } from "antd";
import { CalculatorOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

function Header() {
    return (
        <AntHeader
            style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '0 24px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: 'none',
                height: '64px'
            }}
        >
            <Space align="center">
                <CalculatorOutlined 
                    style={{ 
                        fontSize: '24px', 
                        color: '#fff',
                        marginRight: '12px'
                    }} 
                />
                <Title 
                    level={3} 
                    style={{ 
                        margin: 0, 
                        color: '#fff',
                        fontWeight: '600',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    Калькулятор калорий
                </Title>
            </Space>
        </AntHeader>
    );
}

export default Header;
