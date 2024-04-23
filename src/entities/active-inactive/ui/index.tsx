import styles from './styles.module.scss'

export const ActiveInactive = ({
    type,
    setType,
}: {
    type: string
    setType: (type: string) => void
}) => {
    return (
        <div className={styles.block}>
            <p
                onClick={() => setType('active')}
                className={'active' === type ? styles.active : ''}
            >
                Активные
            </p>
            <p
                onClick={() => setType('inactive')}
                className={'inactive' === type ? styles.active : ''}
            >
                Неактивные
            </p>
        </div>
    )
}
