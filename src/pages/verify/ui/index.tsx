import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { paths } from '@/shared/config/router'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { useVerify } from '../api'
import { VerifyModel } from '../model'
import styles from './styles.module.scss'

export const VerifyPage = () => {
    // const mutation = useMutationLogin()
    const { id } = useParams()
    const navigate = useNavigate()
    const verification = useVerify()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<VerifyModel>({
        defaultValues: {
            code: '',
        },
    })

    const getAuth = (data: VerifyModel) => {
        if (id) {
            verification.mutate({ code: data.code, id: id })
        }
    }

    // console.log(mutation, 'error')

    return (
        <div className={styles.verify}>
            <div className={styles.title}>
                <h1>Подтверждение email</h1>
                <div
                    onClick={() => navigate(`${paths.auth}/${paths.register}`)}
                    className={styles.back}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="24"
                        viewBox="0 0 12 24"
                        fill="none"
                    >
                        <path
                            d="M11.6141 22.137L2.44828 12.7675C2.24725 12.563 2.1345 12.2871 2.1345 11.9995C2.1345 11.7119 2.24725 11.436 2.44828 11.2315L11.6121 1.86197C11.813 1.65626 11.9256 1.3794 11.9256 1.091C11.9256 0.802604 11.813 0.525741 11.6121 0.320039C11.5139 0.218748 11.3966 0.138248 11.2671 0.083282C11.1375 0.0283179 10.9983 -4.83671e-07 10.8577 -4.77487e-07C10.7171 -4.71304e-07 10.5779 0.0283179 10.4484 0.083282C10.3188 0.138248 10.2015 0.218748 10.1033 0.320039L0.939528 9.6876C0.337369 10.3046 -5.58962e-07 11.1348 -5.21393e-07 11.9995C-4.83823e-07 12.8642 0.337369 13.6944 0.939528 14.3114L10.1033 23.6789C10.2015 23.7805 10.3189 23.8613 10.4487 23.9164C10.5784 23.9716 10.7179 24 10.8587 24C10.9995 24 11.139 23.9716 11.2687 23.9164C11.3984 23.8613 11.5159 23.7805 11.6141 23.6789C11.815 23.4732 11.9276 23.1964 11.9276 22.908C11.9276 22.6196 11.815 22.3427 11.6141 22.137Z"
                            fill="black"
                        />
                    </svg>
                    Назад
                </div>
            </div>
            <form
                className={styles.form}
                onSubmit={handleSubmit(getAuth)}
                action=""
            >
                <div className={styles.input}>
                    <label htmlFor="code">Введите код с письма</label>
                    <Input
                        placeholder="Код"
                        {...register('code', {
                            required: 'Это поле обязательное',
                        })}
                        id="code"
                    />
                    <p className={styles.error}>{errors.code?.message}</p>
                    <p>
                        Не пришел код? <span>Отправить ещё раз</span>
                    </p>
                </div>
                {/* <p className={styles.error}>{mutation.error?.message}</p> */}
                <Button size="big" className={styles.button} type="submit">
                    Подтвердить
                </Button>
            </form>
        </div>
    )
}
