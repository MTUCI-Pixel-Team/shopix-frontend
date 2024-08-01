import classNames from 'classnames'
import { FC, HTMLAttributes, ReactNode } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import { SERVER_API } from '@/shared/config/constants'
import { formatPrice } from '@/shared/lib'
import { IProduct } from '../model'
import styles from './styles.module.scss'

interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
    inactive?: boolean
    product?: IProduct
    action?: ReactNode
    loading: boolean
}

export const ProductCard: FC<ProductCardProps> = ({
    inactive = false,
    className,
    product,
    action,
    loading,
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
            to={loading ? '' : `/product/${product?.id}`}
            className={classNames(
                styles.card,
                {
                    [styles.inactive]: inactive,
                },
                className,
            )}
        >
            {loading ? (
                <Skeleton
                    className={styles['img-skeleton']}
                    borderRadius={'16px'}
                    baseColor="var(--second-primary)"
                />
            ) : (
                <img
                    className={styles.img}
                    src={`${SERVER_API}${product?.first_image}`}
                    alt=""
                />
            )}

            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <h2 className={styles.name}>
                        {loading ? (
                            <Skeleton
                                borderRadius={'16px'}
                                width={'85%'}
                                baseColor="var(--second-primary)"
                                className={styles['link-skeleton']}
                            />
                        ) : (
                            product?.title
                        )}
                    </h2>
                    <h3 className={styles.price}>
                        {loading ? (
                            <Skeleton
                                width={'85%'}
                                borderRadius={'16px'}
                                baseColor="var(--second-primary)"
                                className={styles['link-skeleton']}
                            />
                        ) : (
                            formatPrice(+(product?.price || ''))
                        )}
                    </h3>
                    <p className={styles.location}>
                        {loading ? (
                            <Skeleton
                                width={'50%'}
                                borderRadius={'16px'}
                                baseColor="var(--second-primary)"
                                className={styles['link-skeleton']}
                            />
                        ) : (
                            product?.address
                        )}
                    </p>
                    <p className={styles.time}>
                        {loading ? (
                            <Skeleton
                                width={'50%'}
                                borderRadius={'16px'}
                                baseColor="var(--second-primary)"
                                className={styles['link-skeleton']}
                            />
                        ) : (
                            time
                        )}
                    </p>
                </div>
                {!product?.is_owner && (
                    <div className={styles.action}>
                        {loading ? (
                            <Skeleton
                                baseColor="var(--second-primary)"
                                width={48}
                                height={48}
                                className={styles['action-skeleton']}
                                circle
                            />
                        ) : (
                            action
                        )}
                    </div>
                )}
            </div>
        </Link>
    )
}
