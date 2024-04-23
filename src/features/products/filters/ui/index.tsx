import { Checkbox } from '@/shared/ui/checkbox'
import styles from './styles.module.scss'

export const Filters = () => {
    return (
        <div className={styles.filters}>
            {new Array(30).fill(0).map((_, i) => (
                <div key={i} className={styles.filter}>
                    <Checkbox name={'hello'} id={`filter-${i}`} />
                    <label htmlFor={`filter-${i}`}>Filter {i}</label>
                </div>
            ))}
        </div>
    )
}
