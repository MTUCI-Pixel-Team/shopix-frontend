import { Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { v4 as uuidv4 } from 'uuid'
import {
    FavoriteIcon,
    useAddFavorite,
    useRemoveFavorite,
} from '@/features/card/favorites'
import { ProductCard, useGetProducts } from '@/entities/product-card'
import { IProduct } from '@/entities/product-card'
import { EmptyElement } from '@/shared/ui/empty'
import { ErrorElement } from '@/shared/ui/error'
import { ProductCardSkeleton } from '@/shared/ui/skeleton'

export const ProductsList = () => {
    const {
        data,
        error,
        isFetching,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetProducts()
    const mutation = useAddFavorite()
    const mutationRemove = useRemoveFavorite()

    if (error) {
        return <ErrorElement message={error.message} />
    }

    const handleAddFavorite = async (id: number) => {
        await mutation.mutateAsync(id)
    }

    const handleRemoveFavorite = async (id: number) => {
        await mutationRemove.mutateAsync(id)
    }

    if (data?.pages[0].results.length === 0 && !isFetching) {
        return <EmptyElement />
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
                }}
                hasMore={hasNextPage || false}
            >
                {data?.pages.map((item) => (
                    <Fragment key={uuidv4()}>
                        {item.results.map((product: IProduct) => (
                            <ProductCard
                                action={
                                    <FavoriteIcon
                                        isFavorite={
                                            product.is_favorite || false
                                        }
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            e.preventDefault()
                                            if (product.is_favorite) {
                                                handleRemoveFavorite(product.id)
                                            } else {
                                                handleAddFavorite(product.id)
                                            }
                                        }}
                                    />
                                }
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </Fragment>
                ))}
                {(isFetchingNextPage || isFetching || !data) &&
                    new Array(12).fill(0).map((_, i) => (
                        <ProductCard style={{ display: 'block' }} key={i}>
                            <ProductCardSkeleton />
                        </ProductCard>
                    ))}
            </InfiniteScroll>
        </>
    )
}
