import cn from 'classnames'
import { FC, HTMLAttributes, ReactNode, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useInfo } from '@/entities/reviews-card/model'
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
    const popupRef = useRef<HTMLDivElement | null>(null)
    const setUsername = useInfo((state) => state.setUsername)

    const exit = () => {
        localStorage.removeItem('token')
        setUsername('Guest')
        navigate(paths.auth)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node)
            ) {
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
                    <Link
                        onClick={() => setIsPopup(false)}
                        className={styles.link}
                        to={paths.myProduct}
                    >
                        Мои объявления
                    </Link>
                </li>
                <li>
                    <Link
                        onClick={() => setIsPopup(false)}
                        to={paths.favorites}
                    >
                        Избранное
                    </Link>
                </li>
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
