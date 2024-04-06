import cn from 'classnames'
import { FC, InputHTMLAttributes, forwardRef } from 'react'
import styles from './styles.module.scss'

// export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
//     className,
//     ...props
// }) => {
//     return (
//         <>
//             <input className={cn(styles.input, className)} {...props} />
//         </>
//     )
// }

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
