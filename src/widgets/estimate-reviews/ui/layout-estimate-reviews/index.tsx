import { AnimatePresence, motion } from 'framer-motion'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IProduct } from '@/entities/product-card'
import { SERVER_API } from '@/shared/config/constants'
import { formatPrice } from '@/shared/lib'
import { Stars } from '@/shared/ui/stars'
import { CreateReview } from '../create-reviews'
import styles from './styles.module.scss'

interface EstimateReviewsProps {
    products: IProduct[] | undefined
}

export const EstimateReviews: FC<EstimateReviewsProps> = ({ products }) => {
    const navigate = useNavigate()
    const [pickedStars, setPickedStars] = useState<number | null>(null)
    const [pickedProduct, setPickedProduct] = useState<IProduct | null>(null)

    const subPageVariants = {
        initial: { opacity: 0 },
        in: { opacity: 1 },
        out: { opacity: 0 },
    }
    return (
        <AnimatePresence>
            <motion.div
                className={styles.product}
                initial="initial"
                animate="in"
                exit="out"
                variants={subPageVariants}
                transition={{
                    type: 'tween',
                    ease: 'anticipate',
                    duration: 0.5,
                }}
            >
                {products ? (
                    products.map((product) => {
                        return (
                            <div className={styles.card}>
                                <div
                                    className={styles.info}
                                    onClick={() => {
                                        navigate(`/product/${product.id}`)
                                        product
                                    }}
                                >
                                    <div className={styles.image}>
                                        <img
                                            src={`${SERVER_API}${product.first_image}`}
                                            alt=""
                                        />
                                    </div>
                                    <div className={styles.text}>
                                        <div className={styles.name}>Игорь</div>
                                        <div className={styles.title}>
                                            {product.title}
                                        </div>
                                        <div className={styles.price}>
                                            {formatPrice(+product.price)}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.stars}>
                                    <Stars
                                        edit
                                        size="big"
                                        light={true}
                                        fillStars={-1}
                                        setPickedStars={(
                                            stars: number | null,
                                        ) => {
                                            setPickedStars(stars)
                                            setPickedProduct(product)
                                        }}
                                    />
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <h2>Отзывов пока нет</h2>
                )}

                {pickedStars !== null && pickedStars !== undefined && (
                    <CreateReview
                        pickedProduct={pickedProduct}
                        setPickedStars={setPickedStars}
                        stars={pickedStars}
                    />
                )}
            </motion.div>
        </AnimatePresence>
    )
}
