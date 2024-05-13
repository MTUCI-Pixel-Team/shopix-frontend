export interface IProductOnce {
    post: Post
    images: Image[]
}

export interface IEditProduct {
    title: string
    description: string
    price: string
    address: string
    category: number
    status: string
    created_at: string
    updated_at: string
    id: number
    images: Image[]
}

export interface Post {
    title: string
    description: string
    price: string
    user: number
    address: string
    category: number
    created_at?: string
    updated_at?: string
    is_favorite?: boolean
    status?: string
    views?: number
    id: number
    is_owner?: boolean
}

interface Image {
    image: string
    listing: number
}
