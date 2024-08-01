import { Fragment } from 'react/jsx-runtime'
import InfiniteScroll from 'react-infinite-scroll-component'
import { v4 as uuidv4 } from 'uuid'
import { FavoriteIcon, useRemoveFavorite } from '@/features/card/favorites'
import { IProduct, ProductCard } from '@/entities/product-card'
import { EmptyElement } from '@/shared/ui/empty'
import { useGetFavorites } from '..'
import styles from './styles.module.scss'

export const FavoritesList = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
        useGetFavorites()
    const mutation = useRemoveFavorite()

    const isEmpty = data?.pages[0].results.length === 0

    const handleRemoveFavorite = (id: number) => {
        mutation.mutate(id)
    }

    if (isEmpty && !isFetching) {
        return <EmptyElement />
    }

    return (
        <>
            <InfiniteScroll
                dataLength={data?.pages.length || 0}
                next={fetchNextPage}
                loader={<></>}
                className={styles.list}
                style={
                    !isEmpty
                        ? {
                              display: 'grid',
                              gridAutoRows: 'min-content',
                              height: '100%',
                              overflow: 'initial',
                              gridTemplateColumns:
                                  'repeat(auto-fill, minmax(283px, 1fr))',
                              gap: '20px',
                          }
                        : { display: 'block' }
                }
                hasMore={hasNextPage || false}
            >
                {data?.pages.map((item) => (
                    <Fragment key={uuidv4()}>
                        {item.results.map((product: IProduct) => (
                            <ProductCard
                                loading={isFetching}
                                action={
                                    <FavoriteIcon
                                        isFavorite={true}
                                        className={styles.icon}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            handleRemoveFavorite(product.id)
                                        }}
                                    />
                                }
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </Fragment>
                ))}
                {(isFetchingNextPage || (isFetching && !data)) &&
                    new Array(12)
                        .fill(0)
                        .map(() => <ProductCard loading={true} />)}
            </InfiniteScroll>
        </>
    )
}
