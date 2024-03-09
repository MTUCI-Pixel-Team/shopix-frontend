import SelectLib, { GroupBase, Props } from 'react-select'
import './style.scss'

export function Select<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
>({ options, ...props }: Props<Option, IsMulti, Group>) {
    let defaultValue: Option | undefined
    if (
        options &&
        options[0] &&
        typeof options[0] === 'object' &&
        !('options' in options[0])
    ) {
        defaultValue = options[0] as Option
    }

    return (
        <SelectLib
            className="react-select-container"
            classNamePrefix="react-select"
            isSearchable={false}
            defaultValue={defaultValue}
            options={options}
            styles={{
                control: (baseStyles) => ({
                    ...baseStyles,
                    borderRadius: '16px',
                    background: 'var(--second-primary)',
                    border: 'none',
                }),
                menu: (baseStyles) => ({
                    ...baseStyles,
                    borderRadius: '16px',
                    background: 'var(--second-primary)',
                }),
                option: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: '16px',

                    background: state.isSelected
                        ? 'var(--accent)'
                        : state.isFocused
                        ? 'var(--primary)'
                        : 'var(--second-primary)',
                }),
                singleValue: (baseStyles) => ({
                    ...baseStyles,
                    color: 'var(--white-color)',
                }),
                noOptionsMessage: (baseStyles) => ({
                    ...baseStyles,
                    color: 'var(--white-color)',
                }),
                indicatorSeparator: (baseStyles) => ({
                    ...baseStyles,
                    display: 'none',
                }),
                dropdownIndicator: (baseStyles, state) => ({
                    ...baseStyles,
                    fill: 'var(--white-color)',
                    transition: 'transform 0.3s ease',
                    transform: state.selectProps.menuIsOpen
                        ? 'rotate(180deg)' + 'scale(1.3)'
                        : 'scale(1.3)',
                }),
                placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: 'var(--white-color)',
                }),
            }}
            theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                    ...theme.colors,
                    primary: 'var(--accent)',
                },
            })}
            {...props}
        />
    )
}
