import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.scss'

interface NavigationProps {
    setIsPopup: (arg: boolean) => void
}

export const Navigation: FC<NavigationProps> = ({ setIsPopup }) => {
    return (
        <div className={styles.nav}>
            <nav>
                <ul className={styles.links}>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? styles.active : ''
                            }
                        >
                            Главная
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/chats'}
                            className={({ isActive }) =>
                                isActive ? styles.active : ''
                            }
                        >
                            Чаты <span className={styles.chats}>6</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div onMouseEnter={() => setIsPopup(true)} className={styles.logo}>
                <img src="/public/images/profile.png" alt="profile" />
            </div>
        </div>
    )
}
