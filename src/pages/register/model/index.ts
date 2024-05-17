export interface RegisterModel {
    email: string
    password: string
    username: string
    passwordRetry: string
    is_active: boolean
}

export interface RegisterResponse {
    id: number
    email: string
    username: string
    rating: number
    full_name: string | null
    avatar: string | null
    created_at: string
    updated_at: string
    is_active: boolean
}
