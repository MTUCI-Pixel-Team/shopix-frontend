import classNames from 'classnames'
import React, { FC, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ImagesDrop } from '@/entities/images-drop'
import { IProduct, ProductCard } from '@/entities/product-card'
import { ReviewsCard, useGetUsers } from '@/entities/reviews-card'
import { Button } from '@/shared/ui/button'
import { Popup } from '@/shared/ui/popup'
import { Radio } from '@/shared/ui/radio'
import { Stars } from '@/shared/ui/stars'
import { Textarea } from '@/shared/ui/textarea'
import { useCreateReview } from '../../api'
import { ICreateReview } from '../../model'
import styles from './styles.module.scss'

interface CreateReviewProps extends React.HTMLAttributes<HTMLDivElement> {
    stars: number
    setPickedStars: (stars: number | null) => void
    pickedProduct: IProduct | null
}

interface RadioOptions {
    label: string
    value: string
}

export const CreateReview: FC<CreateReviewProps> = ({
    stars,
    setPickedStars,
    pickedProduct,
    ...props
}) => {
    const [images, setImages] = React.useState<(File | string)[]>([])
    const [radioValue, setRadioValue] = React.useState<string>('1')
    const { data, isLoading, isError } = useGetUsers(pickedProduct?.user)
    const mutation = useCreateReview()
    const form = useForm<ICreateReview>({
        defaultValues: {
            review: '',
            result: '',
            rating: stars + 1,
        },
    })

    const radioOptions: RadioOptions[] = [
        { label: 'Услуга оказана', value: '1' },
        { label: 'Не договорились', value: '2' },
    ]

    const handleRadioChange = (value: string) => {
        console.log(value, '--------------')
        setRadioValue(value)
    }

    const handelSubmit = (data: ICreateReview) => {
        const review = {
            ...data,
            result: radioOptions[+radioValue - 1].label,
            listing: pickedProduct?.id,
        }
        const formData = new FormData()
        formData.append('review', JSON.stringify(review))
        images.forEach((image) => {
            formData.append('images', image)
        })

        mutation.mutate(formData, {
            onSuccess: () => {
                setPickedStars(null)
            },
        })
    }

    useEffect(() => {
        form.setValue('rating', stars + 1)
    }, [stars, form])

    console.log(pickedProduct)

    return (
        <Popup {...props}>
            <form
                onSubmit={form.handleSubmit(handelSubmit)}
                className={styles.review}
            >
                <div className={styles.grid}>
                    <div className={styles.left}>
                        <h1 className={styles.title}>Отзыв о пользователе</h1>
                        <div className={styles.user}>
                            {isLoading ? (
                                <div>Загрузка...</div>
                            ) : isError ? (
                                <div>Ошибка</div>
                            ) : (
                                <ReviewsCard
                                    username={data?.username || ''}
                                    image={data?.avatar || ''}
                                    userId={data?.id}
                                    stars={data?.rating}
                                />
                            )}
                        </div>
                        <div className={styles.card}>
                            <p className={styles.subtitle}>Объявление:</p>
                            {pickedProduct && (
                                <ProductCard
                                    loading={false}
                                    product={pickedProduct}
                                />
                            )}
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

                            <Controller
                                name="review"
                                control={form.control}
                                rules={{
                                    required: 'Это поле обязательное',
                                    maxLength: {
                                        value: 5000,
                                        message:
                                            'Максимальная длина 5000 символов',
                                    },
                                }}
                                render={({ field }) => (
                                    <Textarea
                                        className={styles.area}
                                        id="review"
                                        placeholder="Описание"
                                        {...field}
                                    />
                                )}
                            />

                            <p className={styles.error}>
                                {form.formState.errors.review?.message}
                            </p>
                        </div>
                        <div className={styles.images}>
                            <p className={styles.subtitle}>
                                Добавьте фотографии:
                            </p>
                            <ImagesDrop
                                className={styles.drop}
                                images={images}
                                setImages={setImages}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.buttons}>
                    <Button
                        size="big"
                        className={styles.button}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? 'Отправка...' : 'Отправить'}
                    </Button>
                    <Button
                        size="big"
                        className={classNames(styles.button, styles.cancel)}
                        onClick={() => setPickedStars(null)}
                    >
                        Отмена
                    </Button>
                </div>
            </form>
        </Popup>
    )
}
