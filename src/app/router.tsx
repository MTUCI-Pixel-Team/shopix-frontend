import { createHashRouter } from 'react-router-dom'
import { Home } from '@/pages/home'
import { LayoutHeader } from '@/widgets/header'
import { Layout } from '@/shared/ui/layout'

export const router = createHashRouter([
    {
        path: '/',
        element: <Layout layoutHeader={<LayoutHeader />} />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/chats', element: <h2>chats</h2> },
        ],
    },
])
