import { MyProducts } from '@/widgets/my-products'
import styles from './styles.module.scss'

export const MyProductsPage = () => {
    return (
        <div className={styles.page}>
            <h1>Мои объявления: </h1>
            <div className={styles.products}>
                <MyProducts />
            </div>
        </div>
    )
}
