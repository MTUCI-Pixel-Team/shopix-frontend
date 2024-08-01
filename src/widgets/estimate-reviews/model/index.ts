export interface IEstimateReviews {
    id: string
    user: string
    rating: number
    review: string
    created_at: string
    updated_at: string
    is_active: boolean
}

export interface ICreateReviewRequest {
    review: {
        review: string
        result: string
        rating: number
        listing: number
    }
    images: (File | string)[]
}

export interface ICreateReview {
    review: string
    result: string
    rating: number
    listing: number
}
