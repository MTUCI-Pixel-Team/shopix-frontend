import { useState } from 'react'
import { MyProducts } from '@/widgets/my-products'
import { AddProductLayout } from '@/features/products/add-card'
import { ActiveInactive } from '@/entities/active-inactive'
import styles from './styles.module.scss'

export const MyProductsPage = () => {
    const [type, setType] = useState<string>('active')
    return (
        <div className={styles.page}>
            <h1>Мои объявления: </h1>
            <AddProductLayout className={styles.button} />
            <ActiveInactive type={type} setType={setType} />
            <MyProducts type={type} />
        </div>
    )
}
