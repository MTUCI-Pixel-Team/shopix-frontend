export interface OptionType {
    label: string
    value: string
}

export interface IAddressCheck {
    title: Title
    tags: string[]
    distance: Distance
    address: Address
    subtitle?: Subtitle
}

interface Title {
    text: string
}

interface Distance {
    value: number
    text: string
}

interface Address {
    formatted_address: string
    component: Component[]
}

interface Component {
    name: string
    kind: string[]
}

interface Subtitle {
    text: string
}
