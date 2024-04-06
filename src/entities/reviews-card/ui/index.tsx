import { FC, HTMLAttributes, useEffect } from 'react'
import { ReviewsCardSkeleton } from '@/shared/ui/skeleton'
import { Stars } from '@/shared/ui/stars'
import { useGetMe } from '../api'
import { useInfo } from '../model'
import styles from './styles.module.scss'

interface ReviewsCardProps extends HTMLAttributes<HTMLDivElement> {}

export const ReviewsCard: FC<ReviewsCardProps> = ({ ...props }) => {
    const { data, isError, isLoading } = useGetMe()

    const username = useInfo((state) => state.username)
    const stars = useInfo((state) => state.stars)
    const setUsername = useInfo((state) => state.setUsername)

    useEffect(() => {
        if (!isError && !isLoading) {
            setUsername(data.username)
        }
    }, [isError, isLoading, setUsername, data])

    if (isLoading) {
        return <ReviewsCardSkeleton />
    }

    return (
        <div {...props} className={styles.card}>
            <div className={styles.avatar}>
                <img src="/public/images/profile.png" alt="" />
            </div>
            <div className={styles.info}>
                <div className={styles.name}>{username || 'Loading'}</div>
                <div className={styles.reviews}>
                    <div className={styles.rating}>{parseFloat(stars)}</div>
                    <Stars fill={stars} />
                </div>
            </div>
        </div>
    )
}
