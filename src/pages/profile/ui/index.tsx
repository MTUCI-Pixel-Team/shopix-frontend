import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MyProducts } from '@/widgets/my-products'
import { UserProducts } from '@/widgets/user-products'
import { ActiveInactive } from '@/entities/active-inactive'
import { useGetUserProducts } from '@/entities/product-card'
import { ProfileCard } from '@/entities/profile-card'
import { useGetMe, useGetUsers } from '@/entities/profile-card/api'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { ReviewsCardSkeleton } from '@/shared/ui/skeleton'
import { useProfileChanges } from '../api'
import styles from './styles.module.scss'

export const Profile = () => {
    const { id } = useParams()

    // const {
    //     data: userMe,
    //     isError: isErrorUserMe,
    //     isLoading: isLoadingUserMe,
    // } = useGetMe()

    const {
        data: user,
        isError: isErrorUser,
        isLoading: isLoadingUser,
    } = useGetUsers(Number(id))

    const redactionData = useProfileChanges()

    const [type, setType] = useState<string>('active')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setName] = useState('')
    const [editEmail, setEditEmail] = useState(false)
    const [editPassword, setEditPassword] = useState(false)

    const [defaultEmail, setDefaultEmail] = useState('')
    const [defaultPassword, setDefaultPassword] = useState('')
    const [settings, setSettings] = useState(false)

    useEffect(() => {
        if (user) {
            setEmail(user.email)
            setName(user.username)
            setDefaultEmail(user.email)
            setDefaultPassword('')
        }
    }, [user])

    // useEffect(() => {
    //     navigate(`/profile/${id}`)
    // }, [])

    const emailEditHandler = () => {
        setEditEmail(!editEmail)
        if (editEmail) {
            setEmail(defaultEmail)
        }
    }
    const passwordEditHandler = () => {
        setEditPassword(!editPassword)
        if (editPassword) {
            setPassword(defaultPassword)
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const formObject = Object.fromEntries(formData.entries())
        console.log(formObject)
    }

    const changeProfile = () => {
        redactionData.mutate({
            email: email,
            password: password,
            username: username,
        })
    }

    return (
        <div className={styles.profile}>
            {isLoadingUser ? (
                <ReviewsCardSkeleton />
            ) : isErrorUser ? (
                <p>Ошибка</p>
            ) : (
                <div className={styles.left_block}>
                    <ProfileCard
                        className={styles.profile__info}
                        username={user?.username || ''}
                        image={user?.avatar || ''}
                        stars={user?.rating || 0}
                    />
                    {user?.is_owner ? (
                        <Button
                            className={styles.close_profile}
                            onClick={() => setSettings(!settings)}
                            style={{
                                backgroundColor: settings
                                    ? 'var(--second-primary)'
                                    : 'var(--accent)',
                            }}
                        >
                            {settings ? 'ЗАКРЫТЬ' : 'НАСТРОЙКИ'}
                        </Button>
                    ) : null}
                </div>
            )}

            {settings ? (
                <div className={styles.wrapper}>
                    <div className={styles.block}>
                        <p className={styles.active}>Настройки</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputs}>
                            <div className={styles.input}>
                                <label htmlFor="profile__email">
                                    Ваш email
                                </label>
                                <Input
                                    className={styles.button_isactive}
                                    type="email"
                                    id="profile__email"
                                    value={email}
                                    disabled={!editEmail}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Button
                                    className={styles.edit_button}
                                    type="button"
                                    size="small"
                                    onClick={emailEditHandler}
                                    style={{
                                        backgroundColor: editEmail
                                            ? 'var(--second-primary)'
                                            : 'var(--accent)',
                                    }}
                                >
                                    {editEmail ? 'ОТМЕНИТЬ' : 'ИЗМЕНИТЬ'}
                                </Button>
                            </div>
                            <div className={styles.input}>
                                <label htmlFor="profile__password">
                                    Ваш пароль
                                </label>
                                <Input
                                    className={styles.button_isactive}
                                    type="password"
                                    id="profile__password"
                                    placeholder="***********"
                                    value={password}
                                    disabled={!editPassword}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <Button
                                    className={styles.edit_button}
                                    type="button"
                                    size="small"
                                    onClick={passwordEditHandler}
                                    style={{
                                        backgroundColor: editPassword
                                            ? 'var(--second-primary)'
                                            : 'var(--accent)',
                                    }}
                                >
                                    {editPassword ? 'ОТМЕНИТЬ' : 'ИЗМЕНИТЬ'}
                                </Button>
                            </div>
                            <div className={styles.input}>
                                <label htmlFor="profile__name">Ваше имя</label>
                                <Input
                                    type="text"
                                    id="profile__name"
                                    value={username}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Button
                                    style={{ opacity: 0 }}
                                    disabled
                                    size="small"
                                >
                                    ИЗМЕНИТЬ
                                </Button>
                            </div>
                        </div>
                        <Button
                            onClick={() => {
                                changeProfile()
                            }}
                            className={styles.save_changes}
                            size="medium"
                        >
                            СОХРАНИТЬ
                        </Button>
                    </form>
                </div>
            ) : (
                <div className={styles.wrapper}>
                    <ActiveInactive type={type} setType={setType} />
                    {/* {console.log(id, typeof id)} */}
                    {/* <MyProducts type={type} /> */}
                    <UserProducts userId={id || ''} />
                </div>
            )}
        </div>
    )
}
