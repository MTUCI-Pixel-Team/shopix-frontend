import Skeleton from 'react-loading-skeleton'
import { Link, useNavigate } from 'react-router-dom'
import { SERVER_API } from '@/shared/config/constants'
import { Stars } from '@/shared/ui/stars'
import { useGetUsers } from '../api'
import { IReview } from '../model'
import styles from './styles.module.scss'

export const Review = ({ review }: { review: IReview }) => {
    const { data, isLoading, isError } = useGetUsers(review.user)
    const navigate = useNavigate()
    const transformedDate = new Date(review.updated_at).toLocaleDateString()

    return isLoading ? (
        <Skeleton
            height={80}
            baseColor="var(--second-primary)"
            style={{ borderRadius: '16px' }}
        />
    ) : isError ? (
        <h2>Ошибка</h2>
    ) : (
        <div className={styles.review}>
            <div
                className={styles.avatar}
                onClick={() => navigate(`/profile/${review.user}`)}
            >
                {data?.avatar ? (
                    <img src={`${SERVER_API}${data.avatar}`} alt="avatar" />
                ) : (
                    data?.username[0].toUpperCase()
                )}
            </div>
            <div className={styles.info}>
                <div className={styles.title}>
                    <div className={styles.name}>
                        <Link to={`/profile/${review.user}`}>
                            {data?.username}
                        </Link>
                    </div>
                    <div className={styles.date}>{transformedDate}</div>
                </div>
                <div className={styles.stars}>
                    <Stars fillStars={review.rating - 1} size="medium" />
                    <div className={styles.product}>
                        <Link to={`/product/${review.listing}`}>
                            {review.post}
                        </Link>
                    </div>
                </div>
                <div className={styles.status}>{review.result}</div>
                <h2 className={styles.comment}>Комментарий:</h2>
                <div className={styles.description}>{review.review}</div>
            </div>
        </div>
    )
}
