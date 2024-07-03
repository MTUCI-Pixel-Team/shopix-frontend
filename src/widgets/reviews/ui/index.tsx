import { AnimatePresence, motion } from 'framer-motion'
import { FC } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { IUsers, Review } from '@/entities/review'
import { IReviews } from '@/entities/review'
import { EmptyElement } from '@/shared/ui/empty'
import { Select } from '@/shared/ui/select'
import styles from './styles.module.scss'

interface ReviewsProps {
    isLoading: boolean
    data: IReviews[] | undefined
    error: Error | null
    isFetching: boolean
    fetchNextPage: () => void
    hasNextPage: boolean
    isFetchingNextPage: boolean
    status: string
    user: IUsers | undefined
}

export const Reviews: FC<ReviewsProps> = ({
    data,
    error,
    isFetching,
    fetchNextPage,
    isLoading,
    hasNextPage,
    user,
}) => {
    const subPageVariants = {
        initial: { opacity: 0 },
        in: { opacity: 1 },
        out: { opacity: 0 },
    }

    if (data && data[0].results.length === 0 && !isFetching) {
        return <EmptyElement />
    }

    console.log(hasNextPage)

    return (
        <AnimatePresence>
            <motion.div
                className={styles.reviews}
                initial="initial"
                animate="in"
                exit="out"
                variants={subPageVariants}
                transition={{
                    type: 'tween',
                    ease: 'anticipate',
                    delay: 0.15,
                    duration: 0.5,
                }}
            >
                <div className={styles.subtitle}>
                    {user?.count_reviews} отзывов
                </div>
                <Select className={styles.select} />
                <InfiniteScroll
                    dataLength={data?.length || 0}
                    next={fetchNextPage}
                    loader={<></>}
                    hasMore={hasNextPage || false}
                >
                    <div className={styles.info}>
                        {data &&
                            !isLoading &&
                            data?.length > 0 &&
                            data.map((page) => {
                                return page.results.map((review) => {
                                    return (
                                        <Review
                                            key={review.id}
                                            review={review}
                                        />
                                    )
                                })
                            })}
                    </div>
                </InfiniteScroll>
            </motion.div>
        </AnimatePresence>
    )
}
