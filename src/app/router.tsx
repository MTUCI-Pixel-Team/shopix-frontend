import { Navigate, createBrowserRouter } from 'react-router-dom'
import { Favorites } from '@/pages/favorites'
import { HomePage } from '@/pages/home'
import { LoginPage } from '@/pages/login'
import { MyProductsPage } from '@/pages/my-products'
import { ProductPage } from '@/pages/product'
import { RegisterPage } from '@/pages/register'
import { VerifyPage } from '@/pages/verify'
import { LayoutHeader } from '@/widgets/header'
import { Layout, LayoutAuth } from '@/widgets/layout'
import { AuthCheck } from '@/entities/auth-check'
import { paths } from '@/shared/config/router'

export const router = createBrowserRouter([
    {
        path: paths.home,
        element: <Layout layoutHeader={<LayoutHeader />} />,
        children: [
            { path: '', element: <HomePage /> },
            { path: paths.product, element: <ProductPage /> },
            {
                path: paths.myProduct,
                element: (
                    <AuthCheck>
                        <MyProductsPage />
                    </AuthCheck>
                ),
            },
            {
                path: paths.chats,
                element: (
                    <AuthCheck>
                        <h1>Чаты</h1>
                    </AuthCheck>
                ),
            },
            {
                path: paths.favorites,
                element: (
                    <AuthCheck>
                        <Favorites />
                    </AuthCheck>
                ),
            },
        ],
    },
    {
        path: paths.auth,
        element: <LayoutAuth />,
        children: [
            { path: '', element: <Navigate to={paths.login} /> },
            { path: paths.login, element: <LoginPage /> },
            { path: paths.register, element: <RegisterPage /> },
            { path: paths.verify + '/:id', element: <VerifyPage /> },
        ],
    },
])
