import cn from 'classnames'
import { FC, useState } from 'react'
import styles from './styles.module.scss'

interface StarsProps extends React.SVGProps<SVGSVGElement> {
    fillStars?: number
    size?: 'small' | 'medium' | 'big'
    edit?: boolean
    light?: boolean
    setPickedStars?: (stars: number | null) => void
}

export const Stars: FC<StarsProps> = ({
    fillStars = 0,
    size = 'small',
    edit = false,
    className,
    light = false,
    setPickedStars,
    ...props
}) => {
    const [hoveredIndexStar, setHoveredIndexStar] = useState<number | null>(
        fillStars >= 0 ? fillStars : null,
    )

    const starSize = size === 'small' ? 16 : size === 'medium' ? 24 : 40

    const hoverOnStar = (index: number | null) => {
        if (edit && setHoveredIndexStar) {
            setHoveredIndexStar(index)
        }
    }

    const clickOnStar = (index: number) => {
        if (edit && setPickedStars) {
            console.log(index)

            setPickedStars(index)
        }
    }

    return (
        <div className={styles.stars}>
            {[...Array(5)].map((_, index) => (
                <svg
                    key={index}
                    className={cn(
                        className,
                        styles.star,
                        {
                            [styles.light]: light,
                        },
                        {
                            [styles.active]:
                                (hoveredIndexStar !== null &&
                                    index <= hoveredIndexStar) ||
                                (!edit && index < fillStars),
                        },
                    )}
                    style={{ cursor: edit ? 'pointer' : 'default' }}
                    onMouseEnter={() => hoverOnStar(index)}
                    onMouseLeave={() => hoverOnStar(fillStars)}
                    onClick={() => clickOnStar(index)}
                    xmlns="http://www.w3.org/2000/svg"
                    width={starSize}
                    height={starSize}
                    viewBox="0 0 16 16"
                    {...props}
                >
                    <g clipPath="url(#clip0_269_780)">
                        <path
                            d="M5.28174 5.89328L1.21658 6.50995L1.14458 6.52528C1.03559 6.55556 0.936225 6.61555 0.856641 6.69915C0.777056 6.78274 0.720102 6.88694 0.691594 7.0011C0.663086 7.11526 0.664046 7.23529 0.694376 7.34893C0.724705 7.46257 0.783318 7.56576 0.864228 7.64795L3.80924 10.6473L3.11472 14.8839L3.10644 14.9573C3.09976 15.0752 3.12317 15.1929 3.17426 15.2983C3.22535 15.4037 3.30229 15.4929 3.3972 15.557C3.49211 15.621 3.60158 15.6575 3.71439 15.6627C3.82721 15.6679 3.93933 15.6416 4.03926 15.5866L7.67496 13.5866L11.3024 15.5866L11.3661 15.6173C11.4713 15.6606 11.5856 15.6739 11.6973 15.6558C11.809 15.6377 11.9141 15.5888 12.0017 15.5141C12.0894 15.4395 12.1565 15.3418 12.1962 15.231C12.2359 15.1203 12.2467 15.0005 12.2276 14.8839L11.5324 10.6473L14.4787 7.64728L14.5284 7.59062C14.5994 7.49913 14.6459 7.38958 14.6633 7.27315C14.6806 7.15671 14.6682 7.03753 14.6272 6.92777C14.5862 6.818 14.5181 6.72157 14.4299 6.64829C14.3417 6.57501 14.2365 6.52751 14.1251 6.51062L10.0599 5.89328L8.24268 2.03995C8.1901 1.9283 8.10869 1.83429 8.00769 1.76855C7.90668 1.70281 7.79009 1.66797 7.67114 1.66797C7.55218 1.66797 7.4356 1.70281 7.33459 1.76855C7.23358 1.83429 7.15218 1.9283 7.09959 2.03995L5.28174 5.89328Z"
                            fill="#00BAFF"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_269_780">
                            <rect width="16" height="16" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            ))}
        </div>
    )
}
