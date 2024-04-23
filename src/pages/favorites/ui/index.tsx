import { FavoritesList } from '@/widgets/favorites-list'
import styles from './syles.module.scss'

export const Favorites = () => {
    return (
        <div className={styles.favorites}>
            <h1>Избранное</h1>
            <FavoritesList />
        </div>
    )
}
