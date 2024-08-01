import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion'
import { FC, HTMLAttributes, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styles from './styles.module.scss'

interface PopupProps extends HTMLAttributes<HTMLDivElement> {
    closeAvailable?: boolean
}

export const Popup: FC<PopupProps> = ({
    children,
    onClick,
    closeAvailable = true,
    ...props
}) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    const pageVariants = {
        initial: { opacity: 0 },
        in: { opacity: 1 },
        out: { opacity: 1 },
    }

    const motionProps: HTMLMotionProps<'div'> = {
        initial: 'initial',
        animate: 'in',
        exit: 'out',
        variants: pageVariants,
        className: styles.popup,
        transition: {
            type: 'tween',
            ease: 'anticipate',
            duration: 0.5,
        },
        onClick: (e) => {
            e.stopPropagation()
            if (closeAvailable) {
                onClick && onClick(e)
            }
        },
    }

    return ReactDOM.createPortal(
        <div>
            <AnimatePresence>
                {/* @ts-ignore */}
                <motion.div {...motionProps} {...props}>
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>,
        document.getElementById('root')!,
    )
}
