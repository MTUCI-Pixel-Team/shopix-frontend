import { FC, HTMLAttributes, ReactNode, useEffect } from 'react'
import styles from './styles.module.scss'

export const Popup: FC<HTMLAttributes<HTMLDivElement>> = ({
    children,
    ...props
}) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    return (
        <div className={styles.popup} {...props}>
            {children}
        </div>
    )
}
