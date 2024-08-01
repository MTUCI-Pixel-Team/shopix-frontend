import cn from 'classnames'
import classNames from 'classnames'
import { motion, MotionStyle } from 'framer-motion'
import { FC, HTMLAttributes, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { ReviewsCard, useGetMe, useInfo } from '@/entities/reviews-card'
import { paths } from '@/shared/config/router'
import { removeTokens } from '@/shared/config/storage'
import { Button } from '@/shared/ui/button'
import { Popup as PopupFull } from '@/shared/ui/popup'
import { ReviewsUserSkeleton } from '@/shared/ui/skeleton'
import styles from './styles.module.scss'

interface PopupProps extends HTMLAttributes<HTMLDivElement> {
    isPopup: boolean
    setIsPopup: (arg: boolean) => void
}

export const Popup: FC<PopupProps> = ({ isPopup, setIsPopup, className }) => {
    const navigate = useNavigate()
    const popupRef = useRef<HTMLDivElement | null>(null)
    const [isExitPopup, setIsExitPopup] = useState<boolean>(false)
    const { setImage, setUsername } = useInfo((state) => state)
    const { data, isError, isLoading, error } = useGetMe()

    const exit = () => {
        setIsExitPopup(false)
        removeTokens()
        setImage('')
        setUsername('')
        navigate(paths.auth)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node) &&
                !isExitPopup
            ) {
                setIsPopup(false)
            }
        }

        if (isPopup) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isPopup, setIsPopup, isExitPopup])

    const header = document.querySelector('._header_r9bw5_1')
    const headerRect = header && header.getBoundingClientRect()
    let style: MotionStyle = {}
    if (headerRect) {
        style = {
            position: 'fixed',
            top: `-1px`,
            right: `${window.innerWidth - headerRect.right - 8}px`, // Выравниваем по правому краю header
        }
    }

    console.log(isExitPopup)

    return ReactDOM.createPortal(
        <motion.div
            ref={popupRef}
            style={style}
            className={cn(styles.popup, className)}
            initial={{ translateY: -100, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: -100, opacity: 0 }}
            transition={{ duration: 0.35, type: 'spring' }}
        >
            <div className={styles.card}>
                {isLoading ? (
                    <ReviewsUserSkeleton />
                ) : isError ? (
                    error?.message
                ) : (
                    <ReviewsCard
                        username={data?.username || 'Guest'}
                        stars={data?.rating || 0}
                        image={data?.avatar || ''}
                        userId={data?.id || null}
                        setIsPopup={setIsPopup}
                    />
                )}
            </div>
            <hr />
            <ul className={styles.info}>
                <li>
                    <Link
                        className={styles.link}
                        onClick={() => setIsPopup(false)}
                        to={paths.myReviews}
                    >
                        Мои отзывы
                    </Link>
                </li>
                <li>
                    <Link
                        onClick={() => setIsPopup(false)}
                        className={styles.link}
                        to={paths.myProduct}
                    >
                        Мои объявления
                    </Link>
                </li>
                <li>
                    <Link
                        onClick={() => setIsPopup(false)}
                        to={paths.favorites}
                        className={styles.link}
                    >
                        Избранное
                    </Link>
                </li>
                <li>
                    <Link
                        onClick={() => setIsPopup(false)}
                        to={paths.chats}
                        className={styles.link}
                    >
                        Мои чаты
                    </Link>
                </li>
            </ul>
            <hr />
            <ul className={styles.info}>
                <li>
                    <Link
                        // поправить на {`${paths.profile}/${data?.id}`} или что-то подобное
                        onClick={() => setIsPopup(false)}
                        to={`profile/${data?.id}?type=settings`}
                        className={styles.link}
                    >
                        Настройки
                    </Link>
                </li>
                <li
                    onClick={() => setIsExitPopup(true)}
                    className={classNames(styles.exit, styles.link)}
                >
                    Выйти
                </li>
            </ul>
            {isExitPopup ? (
                <PopupFull
                    onClick={() => {
                        setIsExitPopup(false)
                    }}
                >
                    <div
                        onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                        }}
                        className={styles['exit-popup']}
                    >
                        <h3>Вы уверены, что хотите выйти?</h3>
                        <div className={styles.buttons}>
                            <Button onClick={() => setIsExitPopup(false)}>
                                Нет
                            </Button>
                            <Button className={styles.yes} onClick={exit}>
                                Да
                            </Button>
                        </div>
                    </div>
                </PopupFull>
            ) : null}
        </motion.div>,
        document.body,
    )
}
