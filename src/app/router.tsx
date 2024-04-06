import { Navigate, createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@/pages/home'
import { LoginPage } from '@/pages/login'
import { MyProductsPage } from '@/pages/my-products'
import { ProductPage } from '@/pages/product'
import { RegisterPage } from '@/pages/register'
import { LayoutHeader } from '@/widgets/header'
import { Layout, LayoutAuth } from '@/widgets/layout'
import { paths } from '@/shared/config/router'

export const router = createBrowserRouter([
    {
        path: paths.home,
        element: <Layout layoutHeader={<LayoutHeader />} />,
        children: [
            { path: '', element: <HomePage /> },
            { path: paths.product, element: <ProductPage /> },
            { path: paths.myProduct, element: <MyProductsPage /> },
            { path: paths.chats, element: <h1>Чаты</h1> },
        ],
    },
    {
        path: paths.auth,
        element: <LayoutAuth />,
        children: [
            { path: '', element: <Navigate to={paths.login} /> },
            { path: paths.login, element: <LoginPage /> },
            { path: paths.register, element: <RegisterPage /> },
        ],
    },
])
