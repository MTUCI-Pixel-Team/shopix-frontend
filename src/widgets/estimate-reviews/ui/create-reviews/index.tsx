import classNames from 'classnames'
import React, { FC } from 'react'
import { ImagesDrop } from '@/entities/images-drop'
import { ProductCard } from '@/entities/product-card'
import { ReviewsCard } from '@/entities/reviews-card'
import { Button } from '@/shared/ui/button'
import { Popup } from '@/shared/ui/popup'
import { Radio } from '@/shared/ui/radio'
import { Stars } from '@/shared/ui/stars'
import { Textarea } from '@/shared/ui/textarea'
import styles from './styles.module.scss'

interface CreateReviewProps extends React.HTMLAttributes<HTMLDivElement> {
    stars: number
    setPickedStars: (stars: number | null) => void
}

interface RadioOptions {
    label: string
    value: string
}

export const CreateReview: FC<CreateReviewProps> = ({
    stars,
    setPickedStars,
    ...props
}) => {
    const [images, setImages] = React.useState<(File | string)[]>([])

    const radioOptions: RadioOptions[] = [
        { label: 'Услуга оказана', value: '1' },
        { label: 'Не договорились', value: '2' },
    ]

    const handleRadioChange = (value: string) => {
        console.log(value)
    }

    console.log(stars)

    return (
        <Popup {...props}>
            <div className={styles.review}>
                <div className={styles.grid}>
                    <div className={styles.left}>
                        <h1 className={styles.title}>Отзыв о пользователе</h1>
                        <div className={styles.user}>
                            <ReviewsCard
                                username="Hello"
                                image={null}
                                userId={'5'}
                                stars={0}
                            />
                        </div>
                        <div className={styles.card}>
                            <p className={styles.subtitle}>Объявление:</p>
                            <ProductCard
                                product={{
                                    title: 'Title',
                                    price: '100',
                                    first_image:
                                        '/media/images/photo_2024-05-23_19-49-30.jpg',
                                    id: 5,
                                    created_at: '2021-09-01T00:00:00',
                                    address: 'Address',
                                }}
                            />
                        </div>
                        <div className={styles.result}>
                            <p className={styles.subtitle}>
                                Чем все закончилось?
                            </p>
                            <Radio
                                handleRadioChange={handleRadioChange}
                                options={radioOptions}
                                className={styles.radio}
                                name="result"
                            />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <h2 className={styles.title}>Оценка и отзыв</h2>
                        <div className={styles.stars}>
                            <p className={styles.subtitle}>Оценка:</p>
                            <Stars
                                fillStars={stars}
                                size="big"
                                edit
                                setPickedStars={setPickedStars}
                            />
                        </div>
                        <div className={styles.text}>
                            <p className={styles.subtitle}>Отзыв:</p>
                            <Textarea className={styles.area} />
                        </div>
                        <div className={styles.images}>
                            <p className={styles.subtitle}>
                                Добавьте фотографии:
                            </p>
                            <ImagesDrop images={images} setImages={setImages} />
                        </div>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <Button size="big" className={styles.button}>
                        Отправить
                    </Button>
                    <Button
                        size="big"
                        className={classNames(styles.button, styles.cancel)}
                        onClick={() => setPickedStars(null)}
                    >
                        Отмена
                    </Button>
                </div>
            </div>
        </Popup>
    )
}
