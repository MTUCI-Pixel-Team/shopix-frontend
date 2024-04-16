import React, { useState } from 'react'
import { Button } from '@/shared/ui/button'
import { AddButton } from '../add-button'
import { PopupAddProduct } from '../popup'

export const AddProductLayout = () => {
    const [isPopup, setIsPopup] = useState(false)
    return (
        <>
            <AddButton setIsPopup={setIsPopup} />
            {isPopup && <PopupAddProduct setIsPopup={setIsPopup} />}
        </>
    )
}
