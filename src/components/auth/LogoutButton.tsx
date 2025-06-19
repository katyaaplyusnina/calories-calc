import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const LogoutButton: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/login');
    };

    return (
        <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{
                color: '#fff',
                border: 'none',
                padding: '4px 8px',
                height: 'auto',
                fontSize: '14px'
            }}
        >
            Выйти
        </Button>
    );
};

export default LogoutButton;
