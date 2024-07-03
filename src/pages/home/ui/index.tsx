import { useEffect, useState } from 'react'
import { ProductsList } from '@/widgets/products-list'
import { Sidebar } from '@/widgets/sidebar'
import { useGetProducts } from '@/entities/product-card'
import { UpButton } from '@/shared/ui/up'
import styles from './styles.module.scss'

export const HomePage = () => {
    const [maxPrice, setMaxPrice] = useState<number>(0)
    const [minPrice, setMinPrice] = useState<number>(0)
    const [once, setOnce] = useState<boolean>(true)
    const [filters, setFilters] = useState<{ sort_by: string }>({
        sort_by: '-created_at',
    })
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useGetProducts(filters)

    useEffect(() => {
        if (data && once) {
            setMaxPrice(data.pages[0].max_price || 0)
            setMinPrice(data.pages[0].min_price || 0)
            setOnce(false)
        }
    }, [data, once])

    return (
        <div className={styles.home}>
            <ProductsList
                isLoading={isFetching}
                data={data}
                error={error}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetching={isFetching}
                isFetchingNextPage={isFetchingNextPage}
                status={status}
            />
            <Sidebar
                setQureyParams={setFilters}
                maxPrice={maxPrice}
                minPrice={minPrice}
            />
            {/* <UpButton /> */}
        </div>
    )
}
