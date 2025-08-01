import React, { useState } from "react";
import { Layout, Typography, Space, Button, Drawer, Menu } from "antd";
import { CalculatorOutlined, MenuOutlined, HomeOutlined, AppstoreOutlined, CalendarOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import LogoutButton from "../auth/LogoutButton";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

function Header() {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => setVisible(true);
    const closeDrawer = () => setVisible(false);

    return (
        <>
            <AntHeader
                style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '0 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    border: 'none',
                    height: '64px'
                }}
            >
                <Space align="baseline">
                    <Button
                        type="text"
                        icon={<MenuOutlined />}
                        onClick={showDrawer}
                        style={{ 
                            color: 'white', 
                            fontSize: '20px',
                            border: 'none',
                            padding: '4px 8px',
                            marginRight: '16px'
                        }}
                    />
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

            {/* Drawer — выдвигающееся меню */}
            <Drawer
                title={
                    <div style={{ 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        margin: '-24px -24px 0 -24px',
                        padding: '24px',
                        color: '#fff'
                    }}>
                        <Title level={4} style={{ color: '#fff', margin: 0 }}>
                            Меню
                        </Title>
                    </div>
                }
                placement="left"
                closable
                onClose={closeDrawer}
                open={visible}
                bodyStyle={{ 
                    padding: 0,
                    background: '#f5f5f5'
                }}
                headerStyle={{
                    background: 'transparent',
                    border: 'none',
                    padding: 0
                }}
                width="100%" // На весь экран
            >
                <Menu 
                    theme="light" 
                    mode="inline" 
                    defaultSelectedKeys={['1']} 
                    onClick={closeDrawer}
                    style={{
                        background: '#fff',
                        border: 'none',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                        margin: '16px',
                        borderRadius: '12px',
                        overflow: 'hidden'
                    }}
                >
                    <Menu.Item 
                        key="1" 
                        icon={<HomeOutlined style={{ color: '#667eea' }} />}
                        style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            height: '56px',
                            lineHeight: '56px'
                        }}
                    >
                        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                            Главная
                        </Link>
                    </Menu.Item>
                    <Menu.Item 
                        key="2" 
                        icon={<AppstoreOutlined style={{ color: '#667eea' }} />}
                        style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            height: '56px',
                            lineHeight: '56px'
                        }}
                    >
                        <Link to="/products" style={{ color: 'inherit', textDecoration: 'none' }}>
                            Справочник продуктов
                        </Link>
                    </Menu.Item>
                    <Menu.Item 
                        key="3" 
                        icon={<CalculatorOutlined style={{ color: '#667eea' }} />}
                        style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            height: '56px',
                            lineHeight: '56px'
                        }}
                    >
                        <Link to="/calculator" style={{ color: 'inherit', textDecoration: 'none' }}>
                            AI калькулятор калорий
                        </Link>
                    </Menu.Item>
                    <Menu.Item 
                        key="4" 
                        icon={<CalendarOutlined style={{ color: '#667eea' }} />}
                        style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            height: '56px',
                            lineHeight: '56px'
                        }}
                    >
                        <Link to="/daily-meals" style={{ color: 'inherit', textDecoration: 'none' }}>
                            Дневное питание
                        </Link>
                    </Menu.Item>
                    <Menu.Item 
                        key="5" 
                        icon={<SettingOutlined style={{ color: '#667eea' }} />}
                        style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            height: '56px',
                            lineHeight: '56px'
                        }}
                    >
                        <Link to="/settings" style={{ color: 'inherit', textDecoration: 'none' }}>
                            Настройки
                        </Link>
                    </Menu.Item>
                    <Menu.Item 
                        key="6" 
                        icon={<LogoutOutlined style={{ color: '#ff4d4f' }} />}
                        style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            height: '56px',
                            lineHeight: '56px',
                            color: '#ff4d4f'
                        }}
                    >
                        <LogoutButton />
                    </Menu.Item>
                </Menu>
            </Drawer>
        </>
    );
}

export default Header;
