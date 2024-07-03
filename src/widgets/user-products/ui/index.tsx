import { Fragment } from 'react/jsx-runtime'
import InfiniteScroll from 'react-infinite-scroll-component'
import { v4 as uuidv4 } from 'uuid'
import { FavoriteIcon, useAddFavorite } from '@/features/card/favorites'
import {
    IProduct,
    ProductCard,
    useGetUserProducts,
} from '@/entities/product-card'
import { EmptyElement } from '@/shared/ui/empty'
import { ErrorElement } from '@/shared/ui/error'
import { useDeleteProduct } from '..'
import styles from './styles.module.scss'

export const UserProducts = ({
    userId,
    type,
    isOwner,
    editable = true,
}: {
    userId: string
    type: string
    editable?: boolean
    isOwner: boolean
}) => {
    const { data, fetchNextPage, isError, hasNextPage, error, isFetching } =
        useGetUserProducts(userId, type)
    const mutationAddFavorite = useAddFavorite()
    const mutationDeleteProduct = useDeleteProduct()

    const isEmpty = data?.pages[0].results.length === 0

    const handelClickFavorite = async (
        id: number,
        active: boolean | undefined,
    ) => {
        if (active) {
            await mutationDeleteProduct.mutateAsync(id)
            return
        } else {
            await mutationAddFavorite.mutateAsync(id)
            return
        }
    }

    if (isEmpty && !isFetching) {
        return <EmptyElement className={styles.empty} />
    }

    if (isError) {
        return (
            <ErrorElement
                className={styles.error}
                message={error?.message || ''}
            />
        )
    }

    return (
        <>
            <InfiniteScroll
                dataLength={data?.pages.length || 0}
                next={fetchNextPage}
                loader={<></>}
                className={styles.products}
                style={
                    !isEmpty
                        ? {
                              display: 'grid',
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
                        {item.results.map((product: IProduct) => {
                            console.log(product)
                            return (
                                <ProductCard
                                    inactive={type === 'inactive'}
                                    loading={isFetching}
                                    key={product.id}
                                    product={product}
                                    action={
                                        !isOwner ? (
                                            <FavoriteIcon
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    e.preventDefault()
                                                    handelClickFavorite(
                                                        product.id,
                                                        product.is_favorite,
                                                    )
                                                }}
                                                isFavorite={
                                                    product?.is_favorite
                                                }
                                            />
                                        ) : null
                                    }
                                />
                            )
                        })}
                    </Fragment>
                ))}
            </InfiniteScroll>
        </>
    )
}
