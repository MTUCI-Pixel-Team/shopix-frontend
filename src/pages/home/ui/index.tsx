import { useEffect, useState } from 'react'
import { ProductsList } from '@/widgets/products-list'
import { Sidebar } from '@/widgets/sidebar'
import { useGetProducts } from '@/entities/product-card'
import { UpButton } from '@/shared/ui/up'
import styles from './styles.module.scss'

export const HomePage = () => {
    const [scroll, setScroll] = useState(false)
    const [maxPrice, setMaxPrice] = useState<number>(0)
    const [minPrice, setMinPrice] = useState<number>(0)
    const [once, setOnce] = useState<boolean>(true)
    const [searchForPrice, setSearchForPrice] = useState<boolean>(false)
    const [categoryForPrice, setCategoryForPrice] = useState<boolean>(false)
    const [filters, setFilters] = useState({ sort_by: '-created_at' })
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        refetch,
        status,
    } = useGetProducts(filters)

    useEffect(() => {
        if (data && once) {
            setMaxPrice(data.pages[0].max_price)
            setMinPrice(data.pages[0].min_price)
            setOnce(false)
        }
    }, [data])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleScroll = () => {
        if (window.scrollY > 750) {
            setScroll(true)
        } else {
            setScroll(false)
        }
    }
    console.log('rerender')

    return (
        <div onScroll={handleScroll} className={styles.home}>
            <ProductsList
                data={data}
                error={error}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetching={isFetching}
                isFetchingNextPage={isFetchingNextPage}
                status={status}
            />
            {/* <div className={styles.products}>
            </div> */}
            <Sidebar
                qureyParams={filters}
                setQureyParams={setFilters}
                setOnce={setOnce}
                maxPrice={maxPrice}
                minPrice={minPrice}
                setSearchForPrice={setSearchForPrice}
                setCategoryForPrice={setCategoryForPrice}
            />
            <UpButton
                style={{ display: scroll ? 'flex' : 'none' }}
                className={styles.up}
            />
        </div>
    )
}
