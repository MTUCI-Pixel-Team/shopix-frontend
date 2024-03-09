import { useState } from 'react'
import ReactSlider from 'react-slider'
import './styles.scss'

export const Slider = () => {
    const [value, setValue] = useState<number[]>([0, 100])

    const handleChange = (event: number[]) => {
        setValue(event)
    }

    return (
        <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            value={value}
            defaultValue={[0, 100]}
            ariaLabel={['Lower thumb', 'Upper thumb']}
            onChange={(value) => handleChange(value)}
            ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
            pearling
            minDistance={10}
        />
    )
}
