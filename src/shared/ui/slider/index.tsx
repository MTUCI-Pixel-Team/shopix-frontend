import cn from 'classnames'
import { FC, useState } from 'react'
import ReactSlider from 'react-slider'
import { ReactSliderProps } from 'react-slider'
import './styles.scss'

interface SliderProps extends ReactSliderProps {
    weight: number[]
    setSlider: (value: number[]) => void
}

export const Slider: FC<SliderProps> = ({
    min,
    max,
    weight,
    setSlider,
    className,
    ...props
}) => {
    // const [value, setValue] = useState<number[]>(weight)

    const handleChange = (event: number[]) => {
        console.log(event)
        setSlider(event)
    }

    return (
        // @ts-expect-error: Ignore this error because of the issue with the types of the library
        <ReactSlider
            className={cn('horizontal-slider', className)}
            thumbClassName="example-thumb"
            trackClassName="example-track"
            value={weight}
            min={min}
            max={max}
            ariaLabel={['Lower thumb', 'Upper thumb']}
            onChange={(value: number[]) => {
                handleChange(value)
            }}
            ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
            pearling
            // minDistance={minDistance}
            {...props}
        />
    )
}
