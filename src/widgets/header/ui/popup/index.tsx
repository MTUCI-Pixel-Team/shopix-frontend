import cn from 'classnames'
import { FC, HTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
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
    return (
        <div
            onMouseLeave={() => setIsPopup(false)}
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
                <li className={styles.exit}>Выйти</li>
            </ul>
        </div>
    )
}
