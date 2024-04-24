import classNames from 'classnames'
import { MouseEvent, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller, useForm } from 'react-hook-form'
import { SingleValue } from 'react-select'
import { AddressCheck } from '@/entities/address-check'
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

    const [images, setImages] = useState<File[]>([])
    const [address, setAddress] = useState<string>('')
    const [selectedOption, setSelectedOption] = useState<
        | {
              value: number
              label: string
          }
        | undefined
    >(undefined)
    const { getRootProps, getInputProps } = useDropzone({
        // accept: 'image/*',
        onDrop: (acceptedFiles) => {
            setImages((images) => [...images, ...acceptedFiles])
        },
    })

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

    const handelDeletePhoto = (index: number) => {
        setImages((image) => image.filter((_, i) => i !== index))
    }

    const onSubmit = (data: FormAddCard) => {
        console.log(address)
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
                        <div
                            {...getRootProps({
                                className: classNames(
                                    'dropzone',
                                    styles.photos,
                                ),
                            })}
                        >
                            {images.map((img, index) => (
                                <div className={styles.wrapper} key={index}>
                                    <Card
                                        handelDeletePhoto={handelDeletePhoto}
                                        img={img}
                                        id={index}
                                    />
                                </div>
                            ))}
                            <div className={styles['add-photo']}>
                                <label>
                                    <svg
                                        className={styles.icon}
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
                                    {...getInputProps()}
                                    className={styles['photo-input']}
                                    type="file"
                                    id="file"
                                />
                            </div>
                            <p className={styles.error}>
                                {errors.images?.message}
                            </p>
                        </div>
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

const Card = ({
    img,
    id,
    handelDeletePhoto,
}: {
    img: Blob | MediaSource
    id: number
    handelDeletePhoto: (index: number) => void
}) => {
    const [isHover, setIsHover] = useState(false)
    return (
        <div
            className={styles.wrapper}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div
                className={styles['wrapper-del']}
                style={{ display: isHover ? 'block' : 'none' }}
            >
                <svg
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handelDeletePhoto(id)
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="26"
                    viewBox="0 0 24 26"
                    fill="none"
                >
                    <path
                        d="M1.33301 6.33333H22.6663M9.33301 11.6667V19.6667M14.6663 11.6667V19.6667M2.66634 6.33333L3.99967 22.3333C3.99967 23.0406 4.28063 23.7189 4.78072 24.219C5.28082 24.719 5.9591 25 6.66634 25H17.333C18.0403 25 18.7185 24.719 19.2186 24.219C19.7187 23.7189 19.9997 23.0406 19.9997 22.3333L21.333 6.33333M7.99967 6.33333V2.33333C7.99967 1.97971 8.14015 1.64057 8.3902 1.39052C8.64025 1.14048 8.97939 1 9.33301 1H14.6663C15.02 1 15.3591 1.14048 15.6092 1.39052C15.8592 1.64057 15.9997 1.97971 15.9997 2.33333V6.33333"
                        stroke="#00BAFF"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
            <img
                className={styles.photo}
                src={URL.createObjectURL(img || new Blob())}
                alt="photo"
            />
        </div>
    )
}
