import { Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { v4 as uuidv4 } from 'uuid'
import { FavoriteIcon } from '@/features/card/favorites'
import { ProductCard } from '@/entities/product-card'
import { IProduct } from '@/entities/product-card'
import { ErrorElement } from '@/shared/ui/error'
import { ProductCardSkeleton } from '@/shared/ui/skeleton'
import { useGetProducts } from '../api'

export const ProductsList = () => {
    const {
        data,
        error,
        isFetching,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetProducts()

    if (error) {
        return <ErrorElement message={error.message} />
    }

    return (
        <>
            <InfiniteScroll
                dataLength={data?.pages.length || 0}
                next={fetchNextPage}
                loader={<></>}
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fill, minmax(283px, 1fr))',
                    gap: '20px',
                    alignItems: 'center',
                }}
                hasMore={hasNextPage || false}
            >
                {data?.pages.map((item) => (
                    <Fragment key={uuidv4()}>
                        {item.results.map((product: IProduct) => (
                            <ProductCard
                                action={<FavoriteIcon />}
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </Fragment>
                ))}
                {(isFetchingNextPage || (isFetching && !data)) &&
                    new Array(12).fill(0).map((_, i) => (
                        <ProductCard style={{ display: 'block' }} key={i}>
                            <ProductCardSkeleton />
                        </ProductCard>
                    ))}
            </InfiniteScroll>
        </>
    )
}
