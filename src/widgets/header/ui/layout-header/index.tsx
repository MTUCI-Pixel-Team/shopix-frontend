import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ReviewsCard } from '@/entities/reviews-card'
import { getToken, useToken } from '@/shared/config/storage'
import { Logo } from '..'
import { Navigation } from '../navigation'
import { Popup } from '../popup'
import styles from './styles.module.scss'

export const LayoutHeader = () => {
    // const token = getToken()
    const [isPopup, setIsPopup] = useState(false)

    return (
        <div className={styles.header}>
            <Link to="/">
                <Logo />
            </Link>
            <Navigation setIsPopup={setIsPopup} />
            {getToken() && (
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
