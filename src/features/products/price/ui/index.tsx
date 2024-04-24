import { ChangeEvent, useEffect, useState } from 'react'
import { Slider } from '@/shared/ui/slider'
import styles from './styles.module.scss'

interface PriceProps {
    priceFromServer: number[]
    price: number[]
    setPrice: (price: number[]) => void
}

export const Price = ({
    priceFromServer,
    price: slider,
    setPrice: setSlider,
}: PriceProps) => {
    const [minPrice, maxPrice] = priceFromServer
    const [minInputValue, setMinInputValue] = useState(minPrice)
    const [maxInputValue, setMaxInputValue] = useState(maxPrice)

    useEffect(() => {
        setMinInputValue(slider[0])
        setMaxInputValue(slider[1])
    }, [minPrice, maxPrice, slider])

    const handleMinInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMinInputValue(+e.target.value)
    }

    const handleMaxInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxInputValue(+e.target.value)
    }

    const handleMaxInputBlur = () => {
        if (+maxInputValue < minPrice) {
            setSlider([minPrice, minPrice])
        } else {
            setSlider([slider[0], +maxInputValue])
        }
    }

    const handleMinInputBlur = () => {
        if (+minInputValue > maxPrice) {
            setSlider([maxPrice, maxPrice])
        } else {
            setSlider([+minInputValue, slider[1]])
        }
    }

    return (
        <div className={styles.price}>
            <Slider
                className={styles.slider}
                min={minPrice}
                max={maxPrice}
                weight={slider}
                setSlider={setSlider}
            />
            <div className={styles.inputs}>
                <div className={styles.input}>
                    <p>от</p>
                    <input
                        onChange={handleMinInputChange}
                        onBlur={handleMinInputBlur}
                        value={minInputValue}
                        type="number"
                    />
                    <p>₽</p>
                </div>
                <div className={styles.input}>
                    <p>до</p>
                    <input
                        onChange={handleMaxInputChange}
                        onBlur={handleMaxInputBlur}
                        value={maxInputValue}
                        type="number"
                    />
                    <p>₽</p>
                </div>
            </div>
        </div>
    )
}
