import { Slider } from '@/shared/ui/slider'
import styles from './styles.module.scss'

export const Price = () => {
    return (
        <div className={styles.price}>
            <Slider className={styles.slider} />
            <div className={styles.inputs}>
                <div className={styles.input}>
                    <p>от</p>
                    <input type="number" />
                    <p>₽</p>
                </div>
                <div className={styles.input}>
                    <p>до</p>
                    <input type="number" />
                    <p>₽</p>
                </div>
            </div>
        </div>
    )
}
