import cn from 'classnames'
import { InputHTMLAttributes, forwardRef } from 'react'
import styles from './styles.module.scss'

export const Input = forwardRef<
    HTMLInputElement,
    InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
    return (
        <>
            <input
                className={cn(styles.input, className)}
                ref={ref}
                {...props}
            />
        </>
    )
})
