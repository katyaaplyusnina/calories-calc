import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
    HomeOutlined,
    AppstoreOutlined,
    CalculatorOutlined, CalendarOutlined, LogoutOutlined,
} from '@ant-design/icons';
import LogoutButton from "../auth/LogoutButton";

const Sider = () => {
    return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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
            <Menu.Item key="5" icon={<LogoutOutlined />}>
                <LogoutButton></LogoutButton>
            </Menu.Item>
        </Menu>
    );
};

export default Sider;