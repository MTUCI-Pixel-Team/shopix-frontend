import { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './styles.module.scss'

interface LayoutProps {
    layoutHeader: ReactNode
}

export const Layout: FC<LayoutProps> = ({ layoutHeader }) => {
    return (
        <div className={styles.root}>
            <div className={styles.container}>
                {layoutHeader}
                <Outlet />
            </div>
        </div>
    )
}
