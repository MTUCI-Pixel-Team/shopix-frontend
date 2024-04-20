import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ReviewsCard, useInfo } from '@/entities/reviews-card'
import { getToken } from '@/shared/config/storage'
import { Logo } from '..'
import { Navigation } from '../navigation'
import { Popup } from '../popup'
import styles from './styles.module.scss'

export const LayoutHeader = () => {
    // const token = getToken()
    const [isPopup, setIsPopup] = useState(false)
    const name = useInfo((state) => state.username)

    return (
        <div className={styles.header}>
            <Link to="/">
                <Logo />
            </Link>
            <Navigation setIsPopup={setIsPopup} name={name} />
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
