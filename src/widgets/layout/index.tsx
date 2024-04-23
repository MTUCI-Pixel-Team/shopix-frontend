import { FC, ReactNode } from 'react'
import { Link, Outlet } from 'react-router-dom'
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

export const LayoutAuth = () => {
    return (
        <div className={styles.auth}>
            <div className={styles.block}>
                <div className={styles.content}>
                    <Outlet />
                </div>
                <Link to="/">
                    <img
                        src="/public/images/auth.png"
                        alt=""
                        className={styles.auth__img}
                    />
                </Link>
            </div>
        </div>
    )
}
