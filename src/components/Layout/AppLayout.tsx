import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import AppSider from './AppSider';

const { Content } = Layout;

const AppLayout = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppSider />
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