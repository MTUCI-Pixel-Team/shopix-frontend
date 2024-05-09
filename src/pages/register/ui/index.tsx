import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
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
        watch,
        formState: { errors },
    } = useForm<RegisterModel>({
        defaultValues: {
            email: '',
            password: '',
            username: '',
            passwordRetry: '',
        },
    })

    const password = watch('password')

    const getAuth = (data: RegisterModel) => {
        const dataNew = { ...data, is_active: true }
        mutation.mutate(dataNew)
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
                    <label htmlFor="passwordRetry">Повторите пароль</label>
                    <Input
                        type="password"
                        placeholder="Повторите пароль"
                        {...register('passwordRetry', {
                            required: 'Это поле обязательное',

                            minLength: {
                                value: 8,
                                message: 'Минимальная длина пароля 8 символов',
                            },
                            validate: (value) =>
                                value === password || 'Пароли не совпадают',
                        })}
                        id="passwordRetry"
                    />
                    <p className={styles.error}>
                        {errors.passwordRetry?.message}
                    </p>
                </div>
                <div className={styles.input}>
                    <label htmlFor="name">Введите имя пользователя</label>
                    <Input
                        placeholder="Username"
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
                <Link to={`${paths.auth}/${paths.login}`}>Авторизуйтесь</Link>
            </div>
        </div>
    )
}
