import { AnimatePresence, motion } from 'framer-motion'
import { FavoritesList } from '@/widgets/favorites-list'
import styles from './syles.module.scss'

export const Favorites = () => {
    const pageVariants = {
        initial: { opacity: 0, y: '-100px' },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: '100px' },
    }
    return (
        <AnimatePresence>
            <motion.div
                className={styles.favorites}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={{
                    type: 'tween',
                    ease: 'anticipate',
                    duration: 0.5,
                }}
            >
                <h1>Избранное</h1>
                <FavoritesList />
            </motion.div>
        </AnimatePresence>
    )
}
