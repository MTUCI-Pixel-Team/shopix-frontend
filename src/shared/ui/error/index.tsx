import { FC } from 'react'
import styles from './styles.module.scss'

interface ErrorElementProps {
    message: string
    color?: 'dark' | 'light'
}

export const ErrorElement: FC<ErrorElementProps> = ({
    color = 'dark',
    message,
}) => {
    return (
        <div
            className={styles.error}
            style={{
                color: color === 'dark' ? 'var(--black)' : 'var(--white-color)',
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="201"
                height="201"
                viewBox="0 0 201 201"
                fill="none"
            >
                <path
                    d="M100.5 0.916687C45.5301 0.916687 0.916748 45.53 0.916748 100.5C0.916748 155.47 45.5301 200.083 100.5 200.083C155.47 200.083 200.083 155.47 200.083 100.5C200.083 45.53 155.47 0.916687 100.5 0.916687ZM110.458 150.292H90.5417V130.375H110.458V150.292ZM110.458 110.458H90.5417V50.7084H110.458V110.458Z"
                    fill="#71C4EF"
                    style={{ fill: color === 'dark' ? '#00668C' : '#71C4EF' }}
                />
            </svg>
            <p className={styles.title}>Что-то пошло не так</p>
            <p className={styles.text}>
                Error message: <br /> {message}
            </p>
        </div>
    )
}
