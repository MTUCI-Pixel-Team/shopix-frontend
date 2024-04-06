import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Auth } from '@/widgets/auth'
import { paths } from '@/shared/config/router'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { useMutationRegister } from '../api'
import { RegisterModel } from '../model'
import styles from './styles.module.scss'

export const RegisterPage = () => {
    const mutation = useMutationRegister()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterModel>({
        defaultValues: {
            email: '',
            password: '',
            username: '',
        },
    })

    const getAuth = (data: RegisterModel) => {
        console.log(data)
        mutation.mutate(data)
    }

    console.log(mutation)

    return (
        <div className={styles.register}>
            <h1 className={styles.title}>Регистрация</h1>
            <form
                className={styles.form}
                onSubmit={handleSubmit(getAuth)}
                action=""
            >
                <div className={styles.input}>
                    <label htmlFor="email">Введите email</label>
                    <Input
                        type="email"
                        placeholder="Email"
                        {...register('email', {
                            required: 'Это поле обязательное',

                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: 'Введите корректный email',
                            },
                        })}
                        id="email"
                    />
                    <p className={styles.error}>{errors.email?.message}</p>
                </div>
                <div className={styles.input}>
                    <label htmlFor="password">Введите пароль</label>
                    <Input
                        type="password"
                        placeholder="Пароль"
                        {...register('password', {
                            required: 'Это поле обязательное',

                            minLength: {
                                value: 8,
                                message: 'Минимальная длина пароля 8 символов',
                            },
                        })}
                        id="password"
                    />
                    <p className={styles.error}>{errors.password?.message}</p>
                </div>
                <div className={styles.input}>
                    <label htmlFor="name">Введите имя</label>
                    <Input
                        placeholder="Имя"
                        {...register('username', {
                            required: 'Это поле обязательное',
                        })}
                        id="name"
                    />
                    <p className={styles.error}>{errors.username?.message}</p>
                </div>

                <p className={styles.error}>{mutation.error?.message}</p>
                <Button size="big" className={styles.button} type="submit">
                    Зарегистрироваться
                </Button>
            </form>
            <div className={styles.without}>
                <p>Уже есть аккаунт?</p>
                <Link to={`/${paths.auth}/${paths.login}`}>Авторизуйтесь</Link>
            </div>
        </div>
        // <div className={styles.register}>
        //     <h1>Регистрация</h1>
        //     <form onSubmit={handleSubmit(onSubmit)} action="">
        //         <div className={styles.input}>
        //             <label htmlFor="email">Введите email</label>
        //             <Input
        //                 {...register('email', {
        //                     required: 'Это поле обязательное',

        //                     pattern: {
        //                         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        //                         message: 'Введите корректный email',
        //                     },
        //                 })}
        //                 id="email"
        //             />
        //             <p>{errors.email?.message}</p>
        //         </div>
        //         <div className={styles.input}>
        //             <label htmlFor="password">Введите пароль</label>
        //             <Input
        //                 {...register('password', {
        //                     required: 'Это поле обязательное',

        //                     minLength: {
        //                         value: 6,
        //                         message: 'Минимальная длина пароля 6 символов',
        //                     },
        //                 })}
        //                 id="password"
        //             />
        //             <p>{errors.password?.message}</p>
        //         </div>
        //         <div className={styles.input}>
        //             <label htmlFor="name">Введите имя</label>
        //             <Input
        //                 {...register('name', {
        //                     required: 'Это поле обязательное',
        //                 })}
        //                 id="name"
        //             />
        //             <p>{errors.password?.message}</p>
        //         </div>
        //         <Button className={styles.button} type="submit">
        //             Зарегистрироваться
        //         </Button>
        //     </form>
        // </div>
    )
}
