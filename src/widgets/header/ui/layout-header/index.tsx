import { Link } from 'react-router-dom'
import { Navigation } from '@/features/navigation'
import { Logo } from '..'
import styles from './styles.module.scss'

export const LayoutHeader = () => {
    // const [isPopup, setIsPopup] = useState(false)
    return (
        <div className={styles.header}>
            <Link to="/">
                <Logo />
            </Link>
            <Navigation />
        </div>
    )
}
