export interface InputInFormProps {
    labelText: string
    type: string
    inputId: string
    value: string
    status: boolean
    functionChange: (value: string) => void
    clickFunction: () => void
    editButton: boolean
}
