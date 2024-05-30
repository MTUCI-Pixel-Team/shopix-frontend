export interface Categories {
    id: number
    name: string
}

export interface FormAddCard {
    title: string
    description: string
    images: File[]
    category: string
    price: string
    address: string
}

export interface IAddCard {
    images: Image[]
    post: {
        address: string
        category: number
        created_at: string
        description: string
        id: number
        price: string
        status: string
        title: string
        updated_at: string
        user: number
        views: number
    }
}

interface Image {
    image: string
    listing: number
}
