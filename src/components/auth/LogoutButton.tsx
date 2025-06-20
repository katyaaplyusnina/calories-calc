import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store';
import { Button } from 'antd';

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
            onClick={handleLogout}
            style={{
                padding: 0,
                fontWeight: 500,
                color: 'inherit'
            }}
        >
            Выйти
        </Button>
    );
};

export default LogoutButton;
