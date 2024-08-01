import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import { FC } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useInfo } from '@/entities/reviews-card'
import { paths } from '@/shared/config/router'
import { getToken } from '@/shared/config/storage'
import styles from './styles.module.scss'

interface NavigationProps {
    setIsPopup: (arg: boolean) => void
}

export const Navigation: FC<NavigationProps> = ({ setIsPopup }) => {
    const navigate = useNavigate()
    const { username, image } = useInfo((state) => state)

    const handlePopup = () => {
        const token = getToken()
        if (token) {
            setIsPopup(true)
        } else {
            navigate(paths.auth)
        }
    }

    return (
        <motion.div className={styles.nav}>
            <motion.nav>
                <motion.ul className={styles.links}>
                    <motion.li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => {
                                console.log(isActive)
                                return isActive
                                    ? `${styles.link} ${styles.active}`
                                    : styles.link
                            }}
                        >
                            Главная
                        </NavLink>
                    </motion.li>
                    <motion.li>
                        <NavLink
                            to={paths.chats}
                            className={({ isActive }) =>
                                isActive
                                    ? `${styles.active}  ${styles.link}`
                                    : styles.link
                            }
                        >
                            Чаты <span className={styles.chats}>6</span>
                        </NavLink>
                    </motion.li>
                </motion.ul>
            </motion.nav>
            <motion.div onClick={handlePopup} className={styles.logo}>
                {image ? (
                    <img src={image} alt="profile" />
                ) : username ? (
                    username.slice(0, 1).toUpperCase()
                ) : (
                    <User size={'32px'} />
                )}
            </motion.div>
        </motion.div>
    )
}
