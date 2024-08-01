import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { EstimateReviews } from '@/widgets/estimate-reviews'
import { useGetProducts } from '@/entities/product-card'
import { MeAppreciated } from '../appreciated-me'
import { MyMarks } from '../my-marks/indx'
import styles from './styles.module.scss'

export const MyReviewsPage = () => {
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

    let infoBlock = (
        <>
            <MyMarks />
        </>
    )
    switch (filter) {
        case 'on':
            infoBlock = (
                <>
                    <MyMarks />
                </>
            )
            break
        case 'me':
            infoBlock = (
                <>
                    <MeAppreciated />
                </>
            )
            break
        case 'off':
            const allProducts =
                products?.pages.flatMap((page) => page.results) ?? []
            console.log(allProducts, '----------------------')
            infoBlock = isLoadingProducts ? (
                <h2>Загрузка</h2>
            ) : errorProducts ? (
                <h2>Ошибка</h2>
            ) : (
                <EstimateReviews products={allProducts} />
            )
            break
    }

    const pageVariants = {
        initial: { opacity: 0, y: '-100px' },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: '100px' },
    }

    const subPageVariants = {
        initial: { opacity: 0 },
        in: { opacity: 1 },
        out: { opacity: 0 },
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
                <motion.div
                    className={styles.content}
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={subPageVariants}
                    transition={{
                        type: 'tween',
                        ease: 'anticipate',
                        delay: 0.4,
                        duration: 0.5,
                    }}
                >
                    {infoBlock}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
