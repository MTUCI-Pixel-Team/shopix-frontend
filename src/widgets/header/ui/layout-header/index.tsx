import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '@/shared/config/storage'
import { Logo } from '..'
import { Navigation } from '../navigation'
import { Popup } from '../popup'
import styles from './styles.module.scss'

export const LayoutHeader = () => {
    const [isPopup, setIsPopup] = useState<boolean>(false)
    const [username, setUsername] = useState<string>('Guest')

    return (
        <div className={styles.header}>
            <Link to="/">
                <Logo />
            </Link>
            <Navigation setIsPopup={setIsPopup} username={username} />
            {getToken() && (
                <Popup
                    isPopup={isPopup}
                    setIsPopup={setIsPopup}
                    className={styles.popup}
                    setUsername={setUsername}
                />
            )}
        </div>
    )
}
