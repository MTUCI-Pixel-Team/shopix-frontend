import { FC, HTMLAttributes, ReactNode } from 'react'
import { ReviewsUserSkeleton } from '../skeleton'
import styles from './styles.module.scss'

interface PopupProps extends HTMLAttributes<HTMLDivElement> {
    reviewCard: ReactNode
}

export const Popup: FC<PopupProps> = ({ reviewCard }) => {
    return (
        <div className={styles.popup}>
            <div className={styles.card}>
                {reviewCard || <ReviewsUserSkeleton />}
            </div>
            <hr />
            <ul className={styles.info}>
                <li>Мои отзывы</li>
                <li>Мои объявления</li>
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
