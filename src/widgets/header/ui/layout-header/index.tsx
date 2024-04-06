import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ReviewsCard } from '@/entities/reviews-card'
import { Logo } from '..'
import { Navigation } from '../navigation'
import { Popup } from '../popup'
import styles from './styles.module.scss'

export const LayoutHeader = () => {
    const [isPopup, setIsPopup] = useState(false)
    const token = localStorage.getItem('token')

    return (
        <div className={styles.header}>
            <Link to="/">
                <Logo />
            </Link>
            <Navigation setIsPopup={setIsPopup} />
            {token && (
                <Popup
                    isPopup={isPopup}
                    setIsPopup={setIsPopup}
                    className={styles.popup}
                    reviewCard={<ReviewsCard />}
                />
            )}
        </div>
    )
}
