import React, { FC, HTMLAttributes } from 'react'
import { Button } from '@/shared/ui/button'

interface AddButtonProps extends HTMLAttributes<HTMLButtonElement> {
    setIsPopup: (value: boolean) => void
}
export const AddButton: FC<AddButtonProps> = ({ setIsPopup }) => {
    const handleClick = () => {
        setIsPopup(true)
    }
    return <Button onClick={handleClick}>Добавить</Button>
}
