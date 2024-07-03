import { FC, HTMLAttributes } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import { formatDateWithMonthName } from '@/shared/lib'
import { Stars } from '@/shared/ui/stars'
import styles from './styles.module.scss'

interface ProfileCardProps extends HTMLAttributes<HTMLDivElement> {
    username: string
    image: string | null
    stars: number
    date: string
    userId: number
    countReviews: number
    isLoading: boolean
}

export const ProfileCard: FC<ProfileCardProps> = ({
    image,
    username,
    stars,
    date,
    countReviews,
    userId,
    isLoading,
    ...props
}) => {
    return (
        <div {...props} className={styles.card}>
            {isLoading ? (
                <Skeleton
                    baseColor="var(--second-primary)"
                    circle={true}
                    height={'300px'}
                    width={'300px'}
                />
            ) : null}

            {image && !isLoading ? (
                <div className={styles.avatar}>
                    <img src={image} alt="logo" />
                </div>
            ) : username && !isLoading ? (
                <div className={styles.avatar}>{username[0].toUpperCase()}</div>
            ) : !isLoading ? (
                <div className={styles.avatar}>G</div>
            ) : null}

            <div className={styles.info}>
                <div className={styles.name}>
                    {isLoading ? (
                        <Skeleton
                            height={'32px'}
                            baseColor="var(--second-primary)"
                            width={'85%'}
                            borderRadius={'16px'}
                        />
                    ) : (
                        username
                    )}
                </div>
                <div className={styles.reviews}>
                    <div className={styles.reviews__location}>
                        {isLoading ? (
                            <Skeleton
                                height={'16px'}
                                baseColor="var(--second-primary)"
                                width={'85%'}
                                borderRadius={'16px'}
                            />
                        ) : (
                            <>
                                <div className={styles.rating}>{stars}</div>
                                <Stars fillStars={stars - 1} size="medium" />
                                <Link
                                    className={styles.reviews__link}
                                    to={`/reviews/${userId}`}
                                >
                                    {countReviews} отзывов
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <div className={styles['created-at']}>
                    {isLoading ? (
                        <Skeleton
                            height={'16px'}
                            baseColor="var(--second-primary)"
                            width={'85%'}
                            borderRadius={'16px'}
                        />
                    ) : (
                        <>На Shopix с {formatDateWithMonthName(date)}</>
                    )}
                </div>
            </div>
        </div>
    )
}
