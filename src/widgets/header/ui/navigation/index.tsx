import { motion } from 'framer-motion'
import { FC } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { paths } from '@/shared/config/router'
import { getToken } from '@/shared/config/storage'
import styles from './styles.module.scss'

interface NavigationProps {
    setIsPopup: (arg: boolean) => void
    username: string
    image?: string
}

export const Navigation: FC<NavigationProps> = ({
    setIsPopup,
    username = 'Guest',
    image,
}) => {
    const navigate = useNavigate()
    const handlePopup = () => {
        const token = getToken()
        if (token) {
            setIsPopup(true)
        } else {
            navigate(paths.auth)
        }
    }

    // console.log(username)

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
                ) : (
                    username.slice(0, 1).toUpperCase()
                )}
                {/* <img src="/public/images/profile.png" alt="profile" /> */}
            </motion.div>
        </motion.div>
    )
}
