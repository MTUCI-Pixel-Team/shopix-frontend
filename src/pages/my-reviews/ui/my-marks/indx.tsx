import InfiniteScroll from 'react-infinite-scroll-component'
import Skeleton from 'react-loading-skeleton'
import { Review } from '@/entities/review'
import { EmptyElement } from '@/shared/ui/empty'
import { useGetMyReviews } from '../../api'
import styles from './styles.module.scss'

export const MyMarks = () => {
    const { data, fetchNextPage, hasNextPage, isError, isLoading } =
        useGetMyReviews()

    const isEmpty = data?.pages.flatMap((page) => page.results).length === 0
    console.log(data)

    return (
        <InfiniteScroll
            dataLength={data?.pages.flatMap((page) => page.results).length || 0}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<h4>Загрузка...</h4>}
        >
            <div
                className={styles.content}
                style={{ justifyContent: isEmpty ? 'center' : 'flex-start' }}
            >
                {data?.pages
                    .flatMap((page) => page.results)
                    .map((product) => (
                        <Review key={product.id} review={product} />
                    ))}
                {isError && <h4>Ошибка</h4>}
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
                {data?.pages.flatMap((page) => page.results).length === 0 && (
                    <EmptyElement />
                )}
            </div>
        </InfiniteScroll>
    )
}
