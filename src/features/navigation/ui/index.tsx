import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ReviewsCard } from '@/entities/reviewsCard'
import { Popup } from '@/shared/ui/popup'
import styles from './styles.module.scss'

export const Navigation = () => {
    const [isPopup, setIsPopup] = useState(false)

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
            <div
                style={{ display: isPopup ? 'block' : 'none' }}
                className={styles.popup}
                onMouseLeave={() => setIsPopup(false)}
            >
                <Popup reviewCard={<ReviewsCard />} />
            </div>
        </div>
    )
}
