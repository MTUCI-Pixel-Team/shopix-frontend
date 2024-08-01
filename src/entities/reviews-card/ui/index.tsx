import { User } from 'lucide-react'
import { FC, HTMLAttributes } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stars } from '@/shared/ui/stars'
import styles from './styles.module.scss'

interface ReviewsCardProps extends HTMLAttributes<HTMLDivElement> {
    username: string | undefined
    image: string | null
    stars?: number | null
    withoutStars?: boolean
    userId: string | null | undefined
    setIsPopup?: (arg: boolean) => void
}

export const ReviewsCard: FC<ReviewsCardProps> = ({
    image,
    username,
    stars,
    userId,
    withoutStars = false,
    setIsPopup,
    ...props
}) => {
    const navigate = useNavigate()

    return (
        <div
            {...props}
            className={styles.card}
            onClick={() => {
                navigate(`/profile/${userId}`)
                setIsPopup && setIsPopup(false)
            }}
        >
            <div className={styles.avatar}>
                {image ? (
                    <img src={image} alt="logo" />
                ) : username ? (
                    username[0].toUpperCase()
                ) : (
                    <User size={'32px'} />
                )}
            </div>
            <div className={styles.info}>
                <div className={styles.name}>{username}</div>
                {!withoutStars ? (
                    <div className={styles.reviews}>
                        <div className={styles.rating}>{stars}</div>
                        <Stars fillStars={(stars || 0) - 1} />
                    </div>
                ) : null}
            </div>
        </div>
    )
}
