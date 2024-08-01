export interface IUsers {
    id: number
    email: string
    username: string
    rating: number
    full_name: string | null
    avatar: string | null
    created_at: string
    updated_at: string
    is_active: boolean
    is_owner: boolean
    count_reviews: number
}
