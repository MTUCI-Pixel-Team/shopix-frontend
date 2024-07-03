import { AnimatePresence, motion } from 'framer-motion'
import { FC, ReactNode } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { UpButton } from '@/shared/ui/up'
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
                <UpButton />
            </div>
        </div>
    )
}

export const LayoutAuth = () => {
    const pageVariants = {
        initial: { opacity: 0, scale: 0.6 },
        in: { opacity: 1, scale: 1 },
        out: { opacity: 0, scale: 0.6 },
    }

    return (
        <AnimatePresence>
            <motion.div
                className={styles.auth}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={{
                    type: 'spring',
                    ease: 'anticipate',
                    duration: 0.5,
                }}
            >
                <div className={styles.block}>
                    <div className={styles.content}>
                        <Outlet />
                    </div>
                    <Link className={styles.img} to="/">
                        <img
                            src={import.meta.env.VITE_PUBLIC_URL + '/auth.png'}
                            alt=""
                            className={styles.auth__img}
                        />
                    </Link>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
