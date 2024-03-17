import { FavoriteIcon } from '@/features/card/favorites'
import { ProductCard } from '@/entities/product-card'
import { ProductCardSkeleton } from '@/shared/ui/skeleton'
import styles from './styles.module.scss'

export const ProductsList = () => {
    return (
        <>
            {new Array(30).fill(0).map((_, i) => (
                // <ProductCard key={i}>
                //     <ProductCardSkeleton />
                // </ProductCard>
                <ProductCard action={<FavoriteIcon />} key={i} />
            ))}
        </>
    )
}
