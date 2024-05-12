import { FC, Fragment, MouseEvent, ReactNode, useEffect, useState } from 'react'
import styles from './styles.module.scss'

interface MoreIconProps {
    actions: ReactNode
}

export const MoreIcon: FC<MoreIconProps> = ({ actions }) => {
    const [isPopup, setIsPopup] = useState(false)

    const openPopup = (e: MouseEvent<SVGSVGElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsPopup((state) => !state)
    }
    useEffect(() => {
        if (isPopup) {
            document.addEventListener('click', () => setIsPopup(false))
        }

        return () => {
            document.removeEventListener('click', () => setIsPopup(false))
        }
    }, [isPopup])

    return (
        <div className={styles.more}>
            <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                onClick={openPopup}
            >
                <path
                    d="M21.5996 36.6C21.5996 35.8044 21.9157 35.0413 22.4782 34.4787C23.0408 33.9161 23.8038 33.6 24.5994 33.6C25.395 33.6 26.158 33.9161 26.7206 34.4787C27.2832 35.0413 27.5992 35.8044 27.5992 36.6C27.5992 37.3957 27.2832 38.1587 26.7206 38.7213C26.158 39.2839 25.395 39.6 24.5994 39.6C23.8038 39.6 23.0408 39.2839 22.4782 38.7213C21.9157 38.1587 21.5996 37.3957 21.5996 36.6ZM21.5996 24.6C21.5996 23.8044 21.9157 23.0413 22.4782 22.4787C23.0408 21.9161 23.8038 21.6 24.5994 21.6C25.395 21.6 26.158 21.9161 26.7206 22.4787C27.2832 23.0413 27.5992 23.8044 27.5992 24.6C27.5992 25.3957 27.2832 26.1587 26.7206 26.7213C26.158 27.2839 25.395 27.6 24.5994 27.6C23.8038 27.6 23.0408 27.2839 22.4782 26.7213C21.9157 26.1587 21.5996 25.3957 21.5996 24.6ZM21.5996 12.6C21.5996 11.8044 21.9157 11.0413 22.4782 10.4787C23.0408 9.91608 23.8038 9.60001 24.5994 9.60001C25.395 9.60001 26.158 9.91608 26.7206 10.4787C27.2832 11.0413 27.5992 11.8044 27.5992 12.6C27.5992 13.3957 27.2832 14.1587 26.7206 14.7213C26.158 15.2839 25.395 15.6 24.5994 15.6C23.8038 15.6 23.0408 15.2839 22.4782 14.7213C21.9157 14.1587 21.5996 13.3957 21.5996 12.6Z"
                    fill={isPopup ? 'var(--accent)' : '#00668C'}
                />
            </svg>
            <div
                style={{ display: isPopup ? 'block' : 'none' }}
                className={styles.popup}
            >
                {actions}
            </div>
        </div>
    )
}
