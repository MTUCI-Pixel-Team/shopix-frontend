import { Navigation } from '@/features/navigation'
import { Logo } from '..'
import styles from './styles.module.scss'

export const LayoutHeader = () => {
    return (
        <div className={styles.header}>
            <Logo />
            <Navigation />
        </div>
    )
}
