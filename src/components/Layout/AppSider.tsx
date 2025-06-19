import { useState } from 'react';
import { Drawer, Menu, Button } from 'antd';
import {
    HomeOutlined,
    AppstoreOutlined,
    CalculatorOutlined,
    CalendarOutlined,
    LogoutOutlined,
    SettingOutlined,
    MenuOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import LogoutButton from "../auth/LogoutButton";

const AppSider = () => {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => setVisible(true);
    const closeDrawer = () => setVisible(false);

    return (
        <>
            {/* Кнопка для открытия меню */}
            <div style={{ padding: '16px', background: '#001529' }}>
                <Button
                    type="text"
                    icon={<MenuOutlined />}
                    onClick={showDrawer}
                    style={{ color: 'white', fontSize: '20px' }}
                />
            </div>

            {/* Drawer — выдвигающееся меню */}
            <Drawer
                title="Меню"
                placement="left"
                closable
                onClose={closeDrawer}
                open={visible}
                bodyStyle={{ padding: 0 }}
                width="100%" // На весь экран
            >
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={closeDrawer}>
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to="/">Главная</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<AppstoreOutlined />}>
                        <Link to="/products">Справочник продуктов</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<CalculatorOutlined />}>
                        <Link to="/calculator">Калькулятор калорий</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<CalendarOutlined />}>
                        <Link to="/daily-meals">Дневное питание</Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<SettingOutlined />}>
                        <Link to="/settings">Настройки</Link>
                    </Menu.Item>
                    <Menu.Item key="6" icon={<LogoutOutlined />}>
                        <LogoutButton />
                    </Menu.Item>
                </Menu>
            </Drawer>
        </>
    );
};

export default AppSider;