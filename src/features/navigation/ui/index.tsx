import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

export const Navigation = () => {
    return (
        <div className={styles.nav}>
            <nav>
                <ul className={styles.links}>
                    <li>
                        <Link className={styles.active} to="/">
                            Главная
                        </Link>
                    </li>
                    <li>
                        <Link to={'/chats'}>
                            Чаты <span className={styles.chats}>6</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className={styles.logo}>
                <img src="/public/images/profile.png" alt="profile" />
            </div>
        </div>
    )
}
