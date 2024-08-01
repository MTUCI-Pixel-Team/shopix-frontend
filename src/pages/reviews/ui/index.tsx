import { AnimatePresence, motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { Reviews } from '@/widgets/reviews'
import { useReviewsById } from '@/entities/review'
import { ReviewsCard } from '@/entities/reviews-card'
import { SERVER_API } from '@/shared/config/constants'
import { Stars } from '@/shared/ui/stars'
import { useGetUserById } from '../api'
import styles from './styles.module.scss'

export const ReviewsPage = () => {
    const { id } = useParams()
    const { data: userData } = useGetUserById(id)
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching,
        status,
    } = useReviewsById(id)

    const pageVariants = {
        initial: { opacity: 0, y: '-100px' },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: '100px' },
    }

    console.log(data)

    return (
        <AnimatePresence>
            <motion.div
                className={styles.review}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={{
                    type: 'tween',
                    ease: 'anticipate',
                    duration: 0.5,
                }}
            >
                <div className={styles.action}>
                    <h1 className={styles.title}>Отзывы:</h1>
                    {userData ? (
                        <ReviewsCard
                            userId={String(userData?.id)}
                            username={userData?.username}
                            image={`${SERVER_API}${userData?.avatar}`}
                            withoutStars={true}
                        />
                    ) : null}
                    <div className={styles.stars}>
                        <p className={styles.number}>
                            {userData?.rating.toFixed(1)}
                        </p>
                        <Stars
                            fillStars={Math.round(userData?.rating || 0)}
                            size="big"
                        />
                    </div>
                    {/* <div className={styles.subtitle}>
                    {data?.user?.count_reviews} отзывов
                </div>
                <Select className={styles.select} /> */}
                    {/* <InfiniteScroll
                        dataLength={data?.results.length || 0}
                        next={fetchNextPage}
                        loader={<></>}
                        style={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fill, minmax(283px, 1fr))',
                            gap: '20px',
                        }}
                        hasMore={hasNextPage || false}
                    ></InfiniteScroll> */}
                </div>
                <Reviews
                    isLoading={isFetching}
                    data={data?.pages}
                    error={error}
                    fetchNextPage={fetchNextPage}
                    hasNextPage={hasNextPage}
                    isFetching={isFetching}
                    isFetchingNextPage={isFetchingNextPage}
                    status={status}
                    user={userData}
                />
            </motion.div>
        </AnimatePresence>
    )
}
