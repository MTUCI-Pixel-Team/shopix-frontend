import { useEffect } from 'react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Popup } from '@/shared/ui/popup'
import { Select } from '@/shared/ui/select'
import { Textarea } from '@/shared/ui/textarea'
import styles from './styles.module.scss'

export const PopupAddProduct = ({
    setIsPopup,
}: {
    setIsPopup: (value: boolean) => void
}) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    const options = [
        { value: '1', label: 'Одежда' },
        { value: '2', label: 'Обувь' },
        { value: '3', label: 'Аксессуары' },
        { value: '4', label: 'Косметика' },
        { value: '5', label: 'Еда' },
        { value: '6', label: 'Техника' },
        { value: '7', label: 'Спорт' },
        { value: '8', label: 'Другое' },
    ]

    return (
        <Popup>
            <div className={styles.popup}>
                <h2 className={styles.title}>Создание заголовка</h2>
                <form action="" className={styles.form}>
                    <div className={styles.item}>
                        <label htmlFor="name">Заголовок:</label>
                        <Input
                            id="name"
                            placeholder="Например, еда"
                            type="text"
                        />
                    </div>
                    <div className={styles.item}>
                        <label htmlFor="description">Описание:</label>
                        <Textarea id="description" placeholder="Описание" />
                    </div>
                    <div className={styles.item}>
                        <p>Фотографии</p>
                        <div className={styles['add-photo']}>
                            <label htmlFor="file">
                                <svg
                                    className={styles.photo}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="84"
                                    height="76"
                                    viewBox="0 0 84 76"
                                    fill="none"
                                >
                                    <path
                                        d="M8.66634 8.66658H21.1663L29.4997 0.333252H54.4997L62.833 8.66658H75.333C77.5432 8.66658 79.6628 9.54456 81.2256 11.1074C82.7884 12.6702 83.6664 14.7898 83.6664 16.9999V66.9999C83.6664 69.2101 82.7884 71.3297 81.2256 72.8925C79.6628 74.4553 77.5432 75.3333 75.333 75.3333H8.66634C6.4562 75.3333 4.33659 74.4553 2.77378 72.8925C1.21098 71.3297 0.333008 69.2101 0.333008 66.9999V16.9999C0.333008 14.7898 1.21098 12.6702 2.77378 11.1074C4.33659 9.54456 6.4562 8.66658 8.66634 8.66658ZM41.9997 21.1666C36.4743 21.1666 31.1753 23.3615 27.2683 27.2685C23.3613 31.1755 21.1663 36.4746 21.1663 41.9999C21.1663 47.5253 23.3613 52.8243 27.2683 56.7313C31.1753 60.6383 36.4743 62.8332 41.9997 62.8332C47.525 62.8332 52.8241 60.6383 56.7311 56.7313C60.6381 52.8243 62.833 47.5253 62.833 41.9999C62.833 36.4746 60.6381 31.1755 56.7311 27.2685C52.8241 23.3615 47.525 21.1666 41.9997 21.1666ZM41.9997 29.4999C45.3149 29.4999 48.4943 30.8169 50.8385 33.1611C53.1827 35.5053 54.4997 38.6847 54.4997 41.9999C54.4997 45.3151 53.1827 48.4945 50.8385 50.8388C48.4943 53.183 45.3149 54.4999 41.9997 54.4999C38.6845 54.4999 35.505 53.183 33.1608 50.8388C30.8166 48.4945 29.4997 45.3151 29.4997 41.9999C29.4997 38.6847 30.8166 35.5053 33.1608 33.1611C35.505 30.8169 38.6845 29.4999 41.9997 29.4999Z"
                                        fill="white"
                                    />
                                </svg>
                            </label>
                            <input
                                className={styles['photo-input']}
                                type="file"
                                id="file"
                            />
                        </div>
                    </div>
                    <div className={styles.item}>
                        <label htmlFor="category">Категория:</label>
                        <Select
                            maxMenuHeight={400}
                            options={options}
                            height={30}
                            fontSize={16}
                        />
                    </div>
                    <div className={styles.item}>
                        <label htmlFor="price">Цена:</label>
                        <Input id="price" placeholder="Цена" type="number" />
                    </div>
                    <div className={styles.item}>
                        <label htmlFor="address">Адрес:</label>
                        <Input id="address" placeholder="Адрес" type="text" />
                    </div>
                    <div className={styles.buttons}>
                        <Button>Создать</Button>
                        <Button onClick={() => setIsPopup(false)}>
                            Отмена
                        </Button>
                    </div>
                </form>
            </div>
        </Popup>
    )
}
