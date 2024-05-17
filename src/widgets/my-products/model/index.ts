import { IProduct } from '@/entities/product-card'

export interface IYouProductResponse {
    count: number
    next: string
    previous: string
    results: IProduct[]
}
