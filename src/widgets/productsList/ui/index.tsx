import { FavoriteIcon } from '@/features/favorites'
import { ProductCard } from '@/entities/productCard'
import { ProductCardSkeleton } from '@/shared/ui/skeleton'
import styles from './styles.module.scss'

export const ProductsList = () => {
    return (
        <>
            {new Array(10).fill(0).map((_, i) => (
                // <ProductCard key={i}>
                //     <ProductCardSkeleton />
                // </ProductCard>
                <ProductCard action={<FavoriteIcon />} key={i} />
            ))}
        </>
    )
}
