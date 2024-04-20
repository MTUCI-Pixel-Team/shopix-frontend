import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { paths } from '@/shared/config/router'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { useMutationLogin } from '../api'
import { LoginModel } from '../model'
import styles from './styles.module.scss'

export const LoginPage = () => {
    const mutation = useMutationLogin()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginModel>({
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const getAuth = (data: LoginModel) => {
        const formData = new FormData()

        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                // @ts-expect-error Без понятия, как это типизировать
                formData.append(key, data[key])
            }
        }
        // @ts-expect-error Тут мне даже copilot написал, что это очень сложно типизировать
        mutation.mutate(formData)
    }

    console.log(mutation, 'error')

    return (
        <div className={styles.login}>
            <h1 className={styles.title}>Авторизация</h1>
            <form
                className={styles.form}
                onSubmit={handleSubmit(getAuth)}
                action=""
            >
                <div className={styles.input}>
                    <label htmlFor="email">Введите email</label>
                    <Input
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
                <p className={styles.error}>{mutation.error?.message}</p>
                <Button size="big" className={styles.button} type="submit">
                    Авторизоваться
                </Button>
            </form>
            <div className={styles.without}>
                <p>Нет аккаунта?</p>
                <Link to={`${paths.auth}/${paths.register}`}>
                    Зарегистрируйтесь
                </Link>
            </div>
        </div>
    )
}
