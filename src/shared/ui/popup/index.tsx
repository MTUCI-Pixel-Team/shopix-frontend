import { ReactNode } from 'react'
import styles from './styles.module.scss'

export const Popup = ({ children }: { children: ReactNode }) => {
    return <div className={styles.popup}>{children}</div>
}
