import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { UserProducts } from '@/widgets/user-products'
import { ActiveInactive } from '@/entities/active-inactive'
import { ImagesDrop } from '@/entities/images-drop'
import { ProfileCard } from '@/entities/profile-card'
import { useGetUsers } from '@/entities/profile-card'
import { SERVER_API } from '@/shared/config/constants'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { useProfileChanges } from '../api'
import { InputInFormProps } from '../model'
import styles from './styles.module.scss'

export const Profile = () => {
    const { id } = useParams()

    const {
        data: user,
        isError: isErrorUser,
        isLoading: isLoadingUser,
    } = useGetUsers(Number(id))

    const redactionData = useProfileChanges(user?.id || 0)

    // const [type, setType] = useState<string>('active')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setName] = useState('')
    const [avatar, setAvatar] = useState<(File | string)[]>([])
    const [editEmail, setEditEmail] = useState(false)
    const [editPassword, setEditPassword] = useState(false)
    const [wasFirstRedaction, setWasIsFirstRedaction] = useState(false)

    const [defaultEmail, setDefaultEmail] = useState('')
    const [defaultPassword, setDefaultPassword] = useState('')
    // const [settings, setSettings] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    const [type, setType] = useState<string>(
        new URLSearchParams(location.search).get('type') || 'active',
    )

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        params.set('type', type)
        navigate(`?${params.toString()}`, { replace: true })
    }, [type, navigate, location.search])

    useEffect(() => {
        if (user) {
            setEmail(user?.email || '')
            setName(user?.username || '')
            setDefaultEmail(user?.email || '')
            setDefaultPassword('')
            if (user.avatar) {
                // setAvatar([new File([], `${SERVER_API}${user.avatar}`)])
                setAvatar([`${SERVER_API}${user.avatar}`])
            }
            console.log(user.avatar)
        }
    }, [user])

    console.log(avatar)

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

    const changeProfile = async (event: Event | undefined) => {
        event?.preventDefault()
        if (!wasFirstRedaction) {
            setWasIsFirstRedaction(true)
        }
        const formData = new FormData()
        if (typeof avatar[0] === 'string') {
            console.log(avatar[0])
            const response = await axios.get(avatar[0], {
                responseType: 'blob',
            })
            console.log(response.data)
            const file = new File([response.data], avatar[0], {
                type: response.data.type,
            })
            console.log(file)
            formData.append('avatar', file)
        } else {
            console.log(avatar[0])
            formData.append('avatar', avatar[0])
        }
        formData.append('avatar', avatar[0])
        const changeData: {
            email: string
            password: string
            username: string
            rating: number
            formAvatar: FormData
        } = {
            email: email,
            password: password,
            username: username,
            rating: user?.rating ? user?.rating : 0,
            formAvatar: formData,
        }

        redactionData.mutate(changeData)
    }

    console.log(user)

    const pageVariants = {
        initial: { opacity: 0, scale: 0.6 },
        in: { opacity: 1, scale: 1 },
        out: { opacity: 0, scale: 0.6 },
    }

    return (
        <AnimatePresence>
            <motion.div
                className={styles.profile}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={{
                    type: 'tween',
                    ease: 'anticipate',
                    duration: 0.5,
                }}
            >
                {isErrorUser ? (
                    <p>Ошибка</p>
                ) : (
                    <div className={styles.left_block}>
                        <ProfileCard
                            isLoading={isLoadingUser}
                            className={styles.profile__info}
                            username={user?.username || ''}
                            image={
                                user?.avatar
                                    ? `${SERVER_API}${user?.avatar}`
                                    : ''
                            }
                            stars={user?.rating || 0}
                            date={user?.created_at || ''}
                            countReviews={user?.count_reviews || 0}
                            userId={user?.id || 0}
                        />
                        {user?.is_owner ? (
                            <OpenSettings
                                settings={type === 'settings'}
                                setSettings={setType}
                            />
                        ) : null}
                    </div>
                )}
                {type === 'settings' && user?.is_owner ? (
                    <div className={styles.wrapper}>
                        <div className={styles.block}>
                            <p className={styles.active}>Настройки</p>
                        </div>
                        <form
                            onSubmit={() => {
                                changeProfile(event)
                            }}
                        >
                            <div className={styles.inputs}>
                                <InputInForm
                                    labelText="Ваш email"
                                    type="email"
                                    inputId="profile__email"
                                    value={email}
                                    status={!editEmail}
                                    functionChange={setEmail}
                                    clickFunction={emailEditHandler}
                                    editButton={editEmail}
                                />
                                <InputInForm
                                    labelText="Ваш пароль"
                                    type="password"
                                    inputId="profile__password"
                                    value={password}
                                    status={!editPassword}
                                    functionChange={setPassword}
                                    clickFunction={passwordEditHandler}
                                    editButton={editPassword}
                                />
                                <InputInForm
                                    labelText="Ваше имя"
                                    type="text"
                                    inputId="profile__name"
                                    value={username}
                                    status={false}
                                    functionChange={setName}
                                    clickFunction={() => {}}
                                    editButton={false}
                                />
                                <div className={styles.avatar}>
                                    <label htmlFor="profile__avatar">
                                        Ваш аватар
                                    </label>
                                    <ImagesDrop
                                        id="profile__avatar"
                                        isAvatar={true}
                                        currentAvatar={user?.avatar || null}
                                        images={avatar}
                                        setImages={setAvatar}
                                    />
                                    <p className={styles.submit_message}>
                                        {!redactionData.isSuccess &&
                                        wasFirstRedaction
                                            ? 'Загрузка...'
                                            : ''}
                                    </p>
                                </div>
                            </div>
                            <Button
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
                        <UserProducts
                            isOwner={user?.is_owner || false}
                            type={type}
                            userId={id || ''}
                        />
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    )
}

const OpenSettings = ({
    settings,
    setSettings,
}: {
    settings: boolean
    setSettings: (setting: string) => void
}) => {
    return (
        <Button
            className={styles.close_profile}
            onClick={() => {
                setSettings(settings ? 'active' : 'settings')
            }}
            style={{
                backgroundColor: settings
                    ? 'var(--second-primary)'
                    : 'var(--accent)',
            }}
        >
            {settings ? 'ЗАКРЫТЬ' : 'НАСТРОЙКИ'}
        </Button>
    )
}

const InputInForm: React.FC<InputInFormProps> = ({
    labelText,
    type,
    inputId,
    value,
    status,
    functionChange,
    clickFunction,
    editButton,
}) => {
    return (
        <div className={styles.input}>
            <label htmlFor={inputId}>{labelText}</label>
            <Input
                className={styles.button_isactive}
                type={type}
                id={inputId}
                value={value}
                disabled={status}
                onChange={(e) => functionChange(e.target.value)}
                placeholder={type === 'password' ? '***********' : ''}
            />
            <Button
                className={styles.edit_button}
                type="button"
                size="small"
                onClick={clickFunction}
                style={
                    inputId === 'profile__name'
                        ? { opacity: 0 }
                        : {
                              backgroundColor: editButton
                                  ? 'var(--second-primary)'
                                  : 'var(--accent)',
                          }
                }
            >
                {editButton ? 'ОТМЕНИТЬ' : 'ИЗМЕНИТЬ'}
            </Button>
        </div>
    )
}
