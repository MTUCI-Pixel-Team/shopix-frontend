import classNames from 'classnames'
import { MouseEvent, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { SingleValue } from 'react-select'
import { AddressCheck } from '@/entities/address-check'
import { ImagesDrop } from '@/entities/images-drop'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Popup } from '@/shared/ui/popup'
import { Select } from '@/shared/ui/select'
import { Textarea } from '@/shared/ui/textarea'
import { useGetCategories, useMutationAddCard } from '../../api'
import { FormAddCard } from '../../model'
import styles from './styles.module.scss'

export const PopupAddProduct = ({
    setIsPopup,
}: {
    setIsPopup: (value: boolean) => void
}) => {
    const { data, isLoading, isError, error } = useGetCategories()
    const mutate = useMutationAddCard()

    const [images, setImages] = useState<(File | string)[]>([])
    const [address, setAddress] = useState<string>('')
    const [selectedOption, setSelectedOption] = useState<
        | {
              value: number
              label: string
          }
        | undefined
    >(undefined)

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormAddCard>({
        defaultValues: {
            title: '',
            description: '',
            images: [],
            category: '',
            price: '',
            address: '',
        },
    })

    useEffect(() => {
        register('images', {
            required:
                images.length === 0
                    ? { value: true, message: 'Это поле обязательное' }
                    : images.length > 10
                      ? {
                            value: true,
                            message: 'Максимальное количество фотографий 10',
                        }
                      : undefined,
        })
    }, [images, register])

    useEffect(() => {
        register('address', {
            required: !address
                ? { value: true, message: 'Это поле обязательное' }
                : undefined,
        })
    }, [address, register])

    const onSubmit = (data: FormAddCard) => {
        const formatedData = {
            title: data.title,
            description: data.description,
            price: data.price,
            address: address,
            category: selectedOption?.value,
            status: 'active',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }

        const formData = new FormData()
        formData.append('post', JSON.stringify(formatedData))

        images.forEach((img) => {
            formData.append('images', img)
        })

        //@ts-expect-error Я не понимаю, как это типизировать, помогите
        mutate.mutate(formData)
    }

    const handleClose = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) {
            return
        }

        setIsPopup(false)
        console.log(e.target)
    }

    console.log(address)

    return (
        <Popup onClick={handleClose}>
            <div className={styles.popup}>
                <h2 className={styles.title}>Создание объявления</h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    action=""
                    className={styles.form}
                >
                    <div className={styles.item}>
                        <label htmlFor="name">Заголовок:</label>
                        <Input
                            id="name"
                            placeholder="Например, еда"
                            type="text"
                            {...register('title', {
                                required: 'Это поле обязательное',
                                maxLength: {
                                    value: 200,
                                    message: 'Максимальная длина 200 символов',
                                },
                            })}
                        />
                        <p className={styles.error}>{errors.title?.message}</p>
                    </div>
                    <div className={styles.item}>
                        <label htmlFor="description">Описание:</label>
                        <Controller
                            name="description"
                            control={control}
                            rules={{
                                required: 'Это поле обязательное',
                                maxLength: {
                                    value: 5000,
                                    message: 'Максимальная длина 5000 символов',
                                },
                            }}
                            render={({ field }) => (
                                <Textarea
                                    className={styles.textarea}
                                    id="description"
                                    placeholder="Описание"
                                    {...field}
                                />
                            )}
                        />
                        <p className={styles.error}>
                            {errors.description?.message}
                        </p>
                    </div>
                    <div className={styles.item}>
                        <p>Фотографии:</p>
                        <ImagesDrop images={images} setImages={setImages} />
                    </div>
                    <div className={classNames(styles.item, styles.select)}>
                        <label htmlFor="category">Категория:</label>
                        {isLoading ? (
                            <p>Загрузка...</p>
                        ) : isError ? (
                            <p>Ошибка: {error?.message}</p>
                        ) : (
                            <Select
                                maxMenuHeight={300}
                                options={data || []}
                                height={43}
                                fontSize={16}
                                onChange={(
                                    newValue: SingleValue<{
                                        value: number
                                        label: string
                                    }>,
                                ) => {
                                    console.log(newValue)
                                    setSelectedOption(newValue || undefined)
                                }}
                            />
                        )}
                    </div>
                    <div className={styles.item}>
                        <label htmlFor="price">Цена:</label>
                        <Input
                            id="price"
                            placeholder="Цена"
                            type="number"
                            {...register('price', {
                                required: 'Это поле обязательное',
                            })}
                        />
                        <p className={styles.error}>{errors.price?.message}</p>
                    </div>
                    <div className={classNames(styles.item, styles.select)}>
                        <label>Адрес:</label>
                        {/* <Input
                            name="address"
                            type="text"
                            onChange={(e) => {
                                setAddress(e.target.value)
                            }}
                        /> */}
                        <AddressCheck setAddress={setAddress} height={43} />
                        <p className={styles.error}>
                            {errors.address?.message}
                        </p>
                    </div>
                    <div className={styles.status}>
                        {mutate.isPending ? (
                            <p>Загрузка...</p>
                        ) : mutate.isError ? (
                            <p>Ошибка: {mutate.error.message}</p>
                        ) : mutate.isSuccess ? (
                            <p>Объявление успешно создано</p>
                        ) : null}
                    </div>
                    <div className={styles.buttons}>
                        <Button className={styles.create}>Создать</Button>
                        <Button
                            className={styles.cancel}
                            onClick={() => setIsPopup(false)}
                        >
                            Отмена
                        </Button>
                    </div>
                </form>
            </div>
        </Popup>
    )
}
