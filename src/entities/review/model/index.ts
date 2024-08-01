// export interface IReviewsResponse {
//     reviews: IReviews | undefined
//     user: IUsers | undefined
// }

// export interface IReviews {
//     pageParams: string[]
//     pages: IInfResponse[]
// }

export interface IReviewResponse {
    count: number
    next: '' | null
    previous: '' | null
    results: IReview[]
}

export interface IReview {
    listing: number
    review: string
    rating: number
    result: string
    user: number
    id: number
    created_at: Date
    updated_at: Date
    username: string
    avatar: string
    post: string
}

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
