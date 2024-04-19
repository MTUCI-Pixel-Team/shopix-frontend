import React, { useState } from 'react'
import { Button } from '@/shared/ui/button'
import { AddButton } from '../add-button'
import { PopupAddProduct } from '../popup'

export const AddProductLayout = ({ className }: { className: string }) => {
    const [isPopup, setIsPopup] = useState(false)
    return (
        <>
            <AddButton className={className} setIsPopup={setIsPopup} />
            {isPopup && <PopupAddProduct setIsPopup={setIsPopup} />}
        </>
    )
}
