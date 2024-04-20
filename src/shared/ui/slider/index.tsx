import cn from 'classnames'
import { FC, useState } from 'react'
import ReactSlider from 'react-slider'
import { ReactSliderProps } from 'react-slider'
import './styles.scss'

export const Slider: FC<ReactSliderProps> = ({ className, ...props }) => {
    const [value, setValue] = useState<number[]>([0, 100])

    const handleChange = (event: number[]) => {
        setValue(event)
        console.log(value)
    }

    return (
        // @ts-expect-error: Ignore this error because of the issue with the types of the library
        <ReactSlider
            className={cn('horizontal-slider', className)}
            thumbClassName="example-thumb"
            trackClassName="example-track"
            value={value}
            defaultValue={[0, 100]}
            ariaLabel={['Lower thumb', 'Upper thumb']}
            onChange={(value: number[]) => {
                handleChange(value)
            }}
            ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
            pearling
            minDistance={10}
            {...props}
        />
    )
}
