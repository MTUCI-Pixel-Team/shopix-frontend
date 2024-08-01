import { AnimatePresence, motion } from 'framer-motion'
import { FC } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Skeleton from 'react-loading-skeleton'
import { IReviewResponse, IUsers, Review } from '@/entities/review'
import { EmptyElement } from '@/shared/ui/empty'
import { Select } from '@/shared/ui/select'
import styles from './styles.module.scss'

interface ReviewsProps {
    isLoading: boolean
    data: IReviewResponse[] | undefined
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
                        {/* {isLoading ? (
                            new Array(5)
                                .fill(0)
                                .map(() => (
                                    <Skeleton
                                        height={80}
                                        baseColor="var(--second-primary)"
                                        style={{ borderRadius: '16px' }}
                                    />
                                ))
                        ) : error ? (
                            <h4>Ошибка</h4>
                        ) : (
                            data &&
                            data.map((page) => {
                                return page.results.map((review) => {
                                    return (
                                        <Review
                                            key={review.id}
                                            review={review}
                                        />
                                    )
                                })
                            })
                        )} */}
                        {data &&
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
                        {isLoading &&
                            new Array(5)
                                .fill(0)
                                .map(() => (
                                    <Skeleton
                                        height={80}
                                        baseColor="var(--second-primary)"
                                        style={{ borderRadius: '16px' }}
                                    />
                                ))}
                        {error && <h4>Ошибка</h4>}
                    </div>
                </InfiniteScroll>
            </motion.div>
        </AnimatePresence>
    )
}
