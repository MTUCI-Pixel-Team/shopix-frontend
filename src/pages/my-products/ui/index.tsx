import { MyProducts } from '@/widgets/my-products'
import { AddProductLayout } from '@/features/products/add-card/ui/add-product-layout'
import styles from './styles.module.scss'

export const MyProductsPage = () => {
    return (
        <div className={styles.page}>
            <h1>Мои объявления: </h1>
            <AddProductLayout />
            <div className={styles.products}>
                <MyProducts />
            </div>
        </div>
    )
}
