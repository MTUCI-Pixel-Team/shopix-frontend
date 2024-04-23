export interface IProductOnce {
    post: Post
    images: Image[]
}

interface Post {
    title: string
    description: string
    price: string
    user: number
    address: string
    category: number
    created_at: string
    updated_at: string
    is_favorite?: boolean
    status: string
    views: number
    id: number
}

interface Image {
    image: string
    listing: number
}
