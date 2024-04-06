import cn from 'classnames'
import { FC, HTMLAttributes, ReactNode, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { paths } from '@/shared/config/router'
import { ReviewsUserSkeleton } from '@/shared/ui/skeleton'
import styles from './styles.module.scss'

interface PopupProps extends HTMLAttributes<HTMLDivElement> {
    reviewCard: ReactNode
    isPopup: boolean
    setIsPopup: (arg: boolean) => void
}

export const Popup: FC<PopupProps> = ({
    isPopup,
    setIsPopup,
    reviewCard,
    className,
}) => {
    const navigate = useNavigate()
    const popupRef = useRef(null)
    const exit = () => {
        localStorage.removeItem('token')
        navigate(paths.auth)
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsPopup(false)
            }
        }

        if (isPopup) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isPopup, setIsPopup])

    return (
        <div
            ref={popupRef}
            // onMouseLeave={() => setIsPopup(false)}
            className={cn(styles.popup, className)}
            style={{ display: isPopup ? 'block' : 'none' }}
        >
            <div className={styles.card}>
                {reviewCard || <ReviewsUserSkeleton />}
            </div>
            <hr />
            <ul className={styles.info}>
                <li>Мои отзывы</li>
                <li>
                    <Link className={styles.link} to={'/me/products'}>
                        Мои объявления
                    </Link>
                </li>
                <li>Избранное</li>
                <li>Мои чаты</li>
            </ul>
            <hr />
            <ul className={styles.info}>
                <li>Настройки</li>
                <li onClick={exit} className={styles.exit}>
                    Выйти
                </li>
            </ul>
        </div>
    )
}
