import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import NotFound from "./components/pages/NotFound";
import Settings from "./components/pages/Settings";
import AuthRoute from "./components/AuthRoute";

const Login = lazy(() => import('./components/auth/LoginForm'));
const ProductCatalog = lazy(() => import('./components/pages/ProductCatalog'));
const DailyMeals = lazy(() => import('./components/pages/DailyMeals'));
const Home = lazy(() => import('./components/pages/Home'));
const AICalculator = lazy(() => import('./components/pages/AICalculator'));

const routes: RouteObject[] = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'settings',
                element: <Settings />,
            },
            {
                path: 'products',
                element: (
                    <AuthRoute>
                        <ProductCatalog />
                    </AuthRoute>
                ),
            },
            {
                path: 'daily-meals',
                element: (
                    <AuthRoute>
                        <DailyMeals />
                    </AuthRoute>
                ),
            },
            {
                path: 'calculator',
                element: (
                    <AuthRoute>
                        <AICalculator />
                    </AuthRoute>
                ),
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
];

export default routes;