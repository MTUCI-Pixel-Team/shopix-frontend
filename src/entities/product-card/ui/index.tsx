import { FC, HTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.scss'

interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
    action?: ReactNode
}

export const ProductCard: FC<ProductCardProps> = ({ action, children }) => {
    return (
        <div className={styles.card}>
            {children || (
                <>
                    <img
                        className={styles.img}
                        src="/public/images/Rectangle 3.png"
                        alt=""
                    />

                    <div className={styles.wrapper}>
                        <div className={styles.info}>
                            <h2 className={styles.name}>Lorem ipsum</h2>
                            <h3 className={styles.price}>2500 ₽</h3>
                            <p className={styles.location}>
                                Москва, Авиамотроная
                            </p>
                            <p className={styles.time}>Сегодня в 10:39</p>
                        </div>
                        {action}
                    </div>
                </>
            )}
        </div>
    )
}
