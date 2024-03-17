import cn from 'classnames'
import { FC, HTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface UpButtonProps extends HTMLAttributes<HTMLDivElement> {}

export const UpButton: FC<UpButtonProps> = ({ className, ...props }) => {
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <div
            {...props}
            onClick={handleClick}
            className={cn(styles.up, className)}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
            >
                <circle cx="32" cy="32" r="32" fill="#00668C" />
                <path
                    d="M21.8631 37.6853L31.2331 28.4633C31.4375 28.261 31.7135 28.1476 32.0011 28.1476C32.2887 28.1476 32.5646 28.261 32.7691 28.4633L42.1391 37.6833C42.3448 37.8854 42.6217 37.9987 42.9101 37.9987C43.1985 37.9987 43.4754 37.8854 43.6811 37.6833C43.7824 37.5845 43.8629 37.4665 43.9179 37.3362C43.9728 37.2058 44.0011 37.0658 44.0011 36.9243C44.0011 36.7828 43.9728 36.6428 43.9179 36.5124C43.8629 36.3821 43.7824 36.264 43.6811 36.1653L34.3131 26.9453C33.696 26.3394 32.8658 26 32.0011 26C31.1363 26 30.3061 26.3394 29.6891 26.9453L20.3211 36.1653C20.2195 36.2641 20.1387 36.3822 20.0836 36.5128C20.0284 36.6433 20 36.7836 20 36.9253C20 37.067 20.0284 37.2073 20.0836 37.3378C20.1387 37.4683 20.2195 37.5865 20.3211 37.6853C20.5268 37.8874 20.8037 38.0007 21.0921 38.0007C21.3805 38.0007 21.6574 37.8874 21.8631 37.6853Z"
                    fill="white"
                />
            </svg>
        </div>
    )
}
