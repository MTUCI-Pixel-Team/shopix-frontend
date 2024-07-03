import { AnimatePresence, motion } from 'framer-motion'
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

    return ReactDOM.createPortal(
        <div>
            <AnimatePresence>
                <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    className={styles.popup}
                    transition={{
                        type: 'tween',
                        ease: 'anticipate',
                        duration: 0.5,
                    }}
                    onClick={(e) => {
                        e.stopPropagation()
                        if (closeAvailable) {
                            onClick && onClick(e)
                        }
                    }}
                    {...props}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>,
        document.getElementById('root')!,
    )
}
