import React from 'react';
import { logout } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
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
