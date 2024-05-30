export interface IProduct {
    title: string
    description?: string
    price: string
    created_at?: string
    updated_at?: string
    status?: string
    views?: number
    address?: string
    is_favorite?: boolean
    id: number
    first_image: string
    is_owner?: boolean
}

export interface IProductResponse {
    count: number
    next: string | null
    previous: string | null
    results: IProduct[]
    min_price?: number
    max_price?: number
}
