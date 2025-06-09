import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import NotFound from "./components/pages/NotFound";
import About from "./components/pages/About";

const ProductCatalog = lazy(() => import('./components/pages/ProductCatalog'));

const Home = lazy(() => import('./components/pages/Home'));

const routes: RouteObject[] = [
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'about',
                element: <About />,
            },
            {
                path: 'products',
                element: <ProductCatalog />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
];

export default routes;