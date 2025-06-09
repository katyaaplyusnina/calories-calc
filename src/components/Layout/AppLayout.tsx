import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sider from './Sider';

const { Content } = Layout;

const AppLayout = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider />
            <Layout>
                <Header />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div style={{ padding: 24, minHeight: 360 }}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;