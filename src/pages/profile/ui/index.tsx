import cn from 'classnames'
import { useParams } from 'react-router-dom'
import { ProfileCard } from '@/entities/profile-card'
import { useGetUsers } from '@/entities/reviews-card/api'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { ReviewsCardSkeleton } from '@/shared/ui/skeleton'
import styles from './styles.module.scss'

export const Profile = () => {
    const { id } = useParams()

    const {
        data: user,
        isError: isErrorUser,
        isLoading: isLoadingUser,
    } = useGetUsers(Number(id))

    console.log(user)

    return (
        <div className={styles.profile}>
            {isLoadingUser ? (
                <ReviewsCardSkeleton />
            ) : isErrorUser ? (
                <p>Ошибка</p>
            ) : (
                <ProfileCard
                    className={styles.profile__info}
                    username={user?.username || ''}
                    image={user?.avatar || ''}
                    stars={user?.rating || 0}
                />
            )}
            <div className={styles.wrapper}>
                <div className={styles.block}>
                    <p className={styles.active}>Настройки</p>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                    }}
                >
                    <div className={styles.inputs}>
                        <div className={styles.input}>
                            <label htmlFor="profile__email">Ваш email</label>
                            <Input
                                type="email"
                                id="profile__email"
                                value={user?.email}
                            />
                            <Button size="small">ИЗМЕНИТЬ</Button>
                        </div>
                        <div className={styles.input}>
                            <label htmlFor="profile__password">
                                Ваш пароль
                            </label>
                            <Input
                                type="password"
                                id="profile__password"
                                placeholder="***********"
                                value={''}
                            />
                            <Button size="small">ИЗМЕНИТЬ</Button>
                        </div>
                        <div className={styles.input}>
                            <label htmlFor="profile__name">Ваше имя</label>
                            <Input
                                type="text"
                                id="profile__name"
                                value={user?.username}
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
                </form>
            </div>
        </div>
    )
}
