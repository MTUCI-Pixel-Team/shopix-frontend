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
    address: { label: string; value: number }
}
