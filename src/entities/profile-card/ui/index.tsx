import { FC, HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { Stars } from '@/shared/ui/stars'
import styles from './styles.module.scss'

interface ProfileCardProps extends HTMLAttributes<HTMLDivElement> {
    username: string
    image: string | null
    stars: number
}

export const ProfileCard: FC<ProfileCardProps> = ({
    image,
    username,
    stars,
    ...props
}) => {
    // const { data, isError, isLoading, error } = useGetMe()

    // const username = useInfo((state) => state.username)
    // const image = useInfo((state) => state.image)
    // const stars = useInfo((state) => state.stars)
    // const setUsername = useInfo((state) => state.setUsername)

    // useEffect(() => {
    //     if (!isError && !isLoading) {
    //         setUsername(data.username)
    //     }
    // }, [isError, isLoading, setUsername, data])

    // if (isLoading) {
    //     return <ReviewsCardSkeleton />
    // }

    // if (isError) {
    //     return <div>{error?.message}</div>
    // }
    console.log(image)
    return (
        <div {...props} className={styles.card}>
            <div className={styles.avatar}>
                {image ? (
                    <img src={image} alt="logo" />
                ) : username ? (
                    username[0].toUpperCase()
                ) : (
                    'G'
                )}
            </div>
            <div className={styles.info}>
                <div className={styles.name}>{username}</div>
                <div className={styles.reviews}>
                    <div className={styles.reviews__location}>
                        <div className={styles.rating}>{stars}</div>
                        <Stars fill={stars} size="medium" />
                        <Link className={styles.reviews__link} to="/">
                            0 отзывов
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
