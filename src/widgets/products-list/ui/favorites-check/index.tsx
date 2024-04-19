import React from 'react'
import { useGetFavorites } from '@/widgets/favorites-list'

export const FavoritesCheck = ({ cards }) => {
    const { data, isLoading, isError, error } = useGetFavorites()
    const pagesCount = data?.pages.length || 0

    // return <>
    //     {cards.map((card) => {
    //         for (let i = 0; i < pagesCount; i++) {
    //             if (data?.pages[i].results.some((favorite) => favorite.id === card.id)) {
    //                 return <span key={card.id}>🌟</span>
    //             }
    //         }})
    //     }
    // </>
}
