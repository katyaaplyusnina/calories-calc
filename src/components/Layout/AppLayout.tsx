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
                <Content 
                    style={{ 
                        margin: '0',
                        padding: '24px',
                        background: '#f5f5f5',
                        minHeight: 'calc(100vh - 64px)'
                    }}
                >
                    <div 
                        style={{ 
                            padding: '24px',
                            background: '#fff',
                            borderRadius: '12px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                            minHeight: 'calc(100vh - 136px)'
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;