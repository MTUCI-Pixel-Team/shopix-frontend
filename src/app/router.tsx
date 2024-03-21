import { createHashRouter } from 'react-router-dom'
import { HomePage } from '@/pages/home'
import { ProductPage } from '@/pages/product'
import { LayoutHeader } from '@/widgets/header'
import { paths } from '@/shared/config/router'
import { Layout } from '@/shared/ui/layout'
export const router = createHashRouter([
    {
        path: paths.home,
        element: <Layout layoutHeader={<LayoutHeader />} />,
        children: [
            { path: '', element: <HomePage /> },
            { path: paths.product, element: <ProductPage /> },
            { path: paths.chats, element: <h2>chats</h2> },
        ],
    },
])
