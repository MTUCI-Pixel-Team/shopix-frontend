import { IProduct } from '@/entities/product-card'

export interface IFavoriteProductResponse {
    count: number
    next: string
    previous: string
    results: IProduct[]
}
