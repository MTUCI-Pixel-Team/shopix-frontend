import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetMe } from '@/entities/reviews-card'
import { getToken } from '@/shared/config/storage'
import { Logo } from '..'
import { Navigation } from '../navigation'
import { Popup } from '../popup'
import styles from './styles.module.scss'

export const LayoutHeader = () => {
    const [isPopup, setIsPopup] = useState<boolean>(false)

    useGetMe() // делаем запрос для того чтобы подгрузилась картинка в Navigation

    const pageVariants = {
        initial: { opacity: 0, y: '-100px' },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: '-100px' },
    }

    return (
        <AnimatePresence>
            <motion.div
                className={styles.header}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={{
                    type: 'spring',
                    duration: 0.5,
                }}
            >
                <Link to="/">
                    <Logo />
                </Link>
                <Navigation setIsPopup={setIsPopup} />
                <AnimatePresence>
                    {getToken() && isPopup && (
                        <Popup
                            isPopup={isPopup}
                            setIsPopup={setIsPopup}
                            className={styles.popup}
                            // setUsername={setUsername}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    )
}
