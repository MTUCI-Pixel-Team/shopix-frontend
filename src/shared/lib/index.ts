import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export const formatDateWithMonthName = (date: string) => {
    return format(new Date(date), "d MMMM yyyy 'года'", { locale: ru })
}

export const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })
}
