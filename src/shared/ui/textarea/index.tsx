import cn from 'classnames'
import { FC, TextareaHTMLAttributes } from 'react'
import styles from './styles.module.scss'

export const Textarea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
    children,
    className,
    ...props
}) => {
    return (
        <textarea className={cn(styles.area, className)} {...props}>
            {children}
        </textarea>
    )
}
