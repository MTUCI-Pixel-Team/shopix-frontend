import { Stars } from '@/shared/ui/stars'
import styles from './styles.module.scss'

export const ReviewsCard = () => {
    return (
        <div className={styles.card}>
            <div className={styles.avatar}>
                <img src="/public/images/profile.png" alt="" />
            </div>
            <div className={styles.info}>
                <div className={styles.name}>Тюнин Илья</div>
                <div className={styles.reviews}>
                    <div className={styles.rating}>4.5</div>
                    <Stars fill={4} />
                </div>
            </div>
        </div>
    )
}
