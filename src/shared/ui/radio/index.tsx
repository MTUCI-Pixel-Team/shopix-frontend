import classNames from 'classnames'
import React, { FC, useState } from 'react'
import styles from './styles.module.scss'

interface RadioOptions {
    label: string
    value: string
}

interface RadioProps extends React.HTMLAttributes<HTMLDivElement> {
    options: RadioOptions[]
    name: string
    handleRadioChange: (value: string) => void
}

export const Radio: FC<RadioProps> = ({
    options,
    name,
    onChange,
    className,
    ...props
}) => {
    const [selectedValue, setSelectedValue] = useState(options[0].value)

    const handleChange = (event) => {
        setSelectedValue(event.target.value)
        if (onChange) {
            onChange(event.target.value)
        }
    }

    return (
        <div
            className={classNames(styles['radio-container'], className)}
            {...props}
        >
            {options.map((option) => (
                <React.Fragment key={option.value}>
                    <input
                        id={`radio-${option.value}`}
                        className={styles['radio-input']}
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={selectedValue === option.value}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor={`radio-${option.value}`}
                        className={styles['radio-label']}
                    >
                        {option.label}
                        <span className={styles['circle']}></span>
                    </label>
                </React.Fragment>
            ))}
        </div>
    )
}
