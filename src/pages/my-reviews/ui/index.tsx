import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { EstimateReviews } from '@/widgets/estimate-reviews'
import { Reviews } from '@/widgets/reviews'
import { useGetProducts } from '@/entities/product-card'
import { useGetMyReviews } from '../api'
import styles from './styles.module.scss'

export const MyReviewsPage = () => {
    const { data, isError, isLoading } = useGetMyReviews()
    const {
        data: products,
        isFetching: isLoadingProducts,
        error: errorProducts,
    } = useGetProducts()

    const navigate = useNavigate()
    const location = useLocation()
    const [filter, setFilter] = useState(
        new URLSearchParams(location.search).get('filter') || 'on',
    )

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        params.set('filter', filter)
        navigate(`?${params.toString()}`, { replace: true })
    }, [filter, navigate, location.search])

    let infoBlock
    switch (filter) {
        case 'on':
            infoBlock = isLoading ? (
                <h2>Загрузка</h2>
            ) : isError ? (
                <h2>Ошибка</h2>
            ) : (
                // чтобы отрабатывала анимацию: <></> - НЕ УДАЛЯТЬ!!!
                <>
                    <Reviews user={data?.user} reviews={data?.reviews} />
                </>
            )
            break
        case 'me':
            infoBlock = isLoading ? (
                <h2>Загрузка</h2>
            ) : isError ? (
                <h2>Ошибка</h2>
            ) : (
                <Reviews user={data?.user} reviews={data?.myReviews} />
            )
            break
        case 'off':
            const allProducts =
                products?.pages.flatMap((page) => page.results) ?? []
            infoBlock = isLoadingProducts ? (
                <h2>Загрузка</h2>
            ) : errorProducts ? (
                <h2>Ошибка</h2>
            ) : (
                <EstimateReviews products={allProducts} />
            )
            break
        default:
            infoBlock = isLoading ? (
                <h2>Загрузка</h2>
            ) : isError ? (
                <h2>Ошибка</h2>
            ) : (
                <Reviews user={data?.user} reviews={data?.reviews} />
            )
            break
    }

    const pageVariants = {
        initial: { opacity: 0, y: '-100px' },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: '100px' },
    }

    return (
        <AnimatePresence>
            <motion.div
                className={styles.reviews}
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
                <h1 className={styles.title}>Мои отзывы:</h1>
                <ul className={styles.filter}>
                    <li
                        className={classNames(styles.item, {
                            [styles.active]: filter === 'on',
                        })}
                        onClick={() => setFilter('on')}
                    >
                        Оставленные
                    </li>
                    <li
                        className={classNames(styles.item, {
                            [styles.active]: filter === 'me',
                        })}
                        onClick={() => setFilter('me')}
                    >
                        Оценили меня
                    </li>
                    <li
                        className={classNames(styles.item, {
                            [styles.active]: filter === 'off',
                        })}
                        onClick={() => setFilter('off')}
                    >
                        Ждут оценки
                    </li>
                </ul>
                {infoBlock}
            </motion.div>
        </AnimatePresence>
    )
}
