import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MyProducts } from '@/widgets/my-products'
import { AddProductLayout } from '@/features/products/add-card'
import { ActiveInactive } from '@/entities/active-inactive'
import styles from './styles.module.scss'

export const MyProductsPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [type, setType] = useState<string>(
        new URLSearchParams(location.search).get('type') || 'active',
    )

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        params.set('type', type)
        navigate(`?${params.toString()}`, { replace: true })
    }, [type, navigate, location.search])

    const pageVariants = {
        initial: { opacity: 0, y: '-100px' },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: '100px' },
    }

    return (
        <AnimatePresence>
            <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={{
                    type: 'spring',
                    ease: 'backIn',
                    duration: 0.6,
                }}
            >
                <h1>Мои объявления: </h1>
                <AddProductLayout className={styles.button} />
                <ActiveInactive type={type} setType={setType} />
                <MyProducts type={type} />
            </motion.div>
        </AnimatePresence>
    )
}
