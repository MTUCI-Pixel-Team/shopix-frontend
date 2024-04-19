import { FC, HTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { SERVER_API } from '@/shared/config/constants'
import { IProduct } from '..'
import styles from './styles.module.scss'

interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
    product?: IProduct
    action?: ReactNode
}

export const ProductCard: FC<ProductCardProps> = ({
    product,
    action,
    children,
    style,
}) => {
    const time = new Date(product?.created_at || '').toLocaleString('ru', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    })

    return (
        <Link
            style={style}
            to={`/product/${product?.id}`}
            className={styles.card}
        >
            {!product ? (
                children
            ) : (
                <>
                    <img
                        className={styles.img}
                        src={`${SERVER_API}${product.first_image}`}
                        alt=""
                    />

                    <div className={styles.wrapper}>
                        <div className={styles.info}>
                            <h2 className={styles.name}>{product?.title}</h2>
                            <h3 className={styles.price}>
                                {Math.round(+product?.price)} ₽
                            </h3>
                            <p className={styles.location}>
                                {product?.address || ''}
                            </p>
                            <p className={styles.time}>{time}</p>
                        </div>
                        <div className={styles.action}>{action}</div>
                    </div>
                </>
            )}
        </Link>
    )
}
