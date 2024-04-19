import { FC, HTMLAttributes, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { paths } from '@/shared/config/router'
import { ReviewsCardSkeleton } from '@/shared/ui/skeleton'
import { Stars } from '@/shared/ui/stars'
import { useGetMe } from '../api'
import { useInfo } from '../model'
import styles from './styles.module.scss'

interface ReviewsCardProps extends HTMLAttributes<HTMLDivElement> {}

export const ReviewsCard: FC<ReviewsCardProps> = ({ ...props }) => {
    const { data, isError, isLoading, error } = useGetMe()

    const username = useInfo((state) => state.username)
    const image = useInfo((state) => state.image)
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

    // if (isError) {
    //     console.log(error)
    //     return <Navigate to={paths.auth} />
    // }

    return (
        <div {...props} className={styles.card}>
            <div className={styles.avatar}>
                {image ? (
                    <img src={image} alt="logo" />
                ) : (
                    username.slice(0, 1).toUpperCase()
                )}
            </div>
            <div className={styles.info}>
                <div className={styles.name}>{username || 'Loading'}</div>
                <div className={styles.reviews}>
                    <div className={styles.rating}>{stars}</div>
                    <Stars fill={stars} />
                </div>
            </div>
        </div>
    )
}
