import { MyProducts } from '@/widgets/my-products'
import { AddProductLayout } from '@/features/products/add-card'
import styles from './styles.module.scss'

export const MyProductsPage = () => {
    return (
        <div className={styles.page}>
            <h1>Мои объявления: </h1>
            <AddProductLayout className={styles.button} />
            <MyProducts />
        </div>
    )
}
