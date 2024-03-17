import { FavoriteIcon } from '@/features/card/favorites'
import { ProductCard } from '@/entities/product-card'

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
