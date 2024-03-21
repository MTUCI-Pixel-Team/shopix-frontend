import { FC, HTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
    product?: {
        id: number
        name: string
        price: number
        url: string
        image: string
    }
    action?: ReactNode
}

export const ProductCard: FC<ProductCardProps> = ({
    product,
    action,
    children,
    style,
}) => {
    // https://swapi.dev/api/people/2/ - example
    const id = product?.url.split('/').splice(-2, 1)[0]
    return (
        <Link style={style} to={`/product/${id}`} className={styles.card}>
            {!product ? (
                children
            ) : (
                <>
                    <img
                        className={styles.img}
                        src={
                            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1041px-Star_Wars_Logo.svg.png'
                        }
                        alt=""
                    />

                    <div className={styles.wrapper}>
                        <div className={styles.info}>
                            <h2 className={styles.name}>{product?.name}</h2>
                            <h3 className={styles.price}>{product?.price} ₽</h3>
                            <p className={styles.location}>
                                Москва, Авиамотроная
                            </p>
                            <p className={styles.time}>Сегодня в 10:39</p>
                        </div>
                        {action}
                    </div>
                </>
            )}
        </Link>
    )
}
