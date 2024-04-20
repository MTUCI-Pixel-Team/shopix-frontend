export interface OptionType {
    label: string
    value: string
}

export interface IAddressCheck {
    title: Title
    subtitle: Subtitle
    tags: string[]
    distance: Distance
    address: Address
}

interface Title {
    text: string
    hl?: Hl[]
}

interface Hl {
    begin: number
    end: number
}

interface Subtitle {
    text: string
    hl?: Hl2[]
}

interface Hl2 {
    begin: number
    end: number
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
