import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store';

const LogoutButton: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/login');
    };

    return (
        <span
          onClick={handleLogout}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                  handleLogout();
              }
          }}
        >
            Выйти
        </span>
    );
};

export default LogoutButton;
