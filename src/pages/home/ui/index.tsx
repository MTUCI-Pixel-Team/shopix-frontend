import { useEffect, useState } from 'react'
import { ProductsList } from '@/widgets/products-list'
import { Sidebar } from '@/widgets/sidebar'
import { UpButton } from '@/shared/ui/up'
import styles from './styles.module.scss'

export const HomePage = () => {
    const [scroll, setScroll] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleScroll = () => {
        if (window.scrollY > 750) {
            setScroll(true)
        } else {
            setScroll(false)
        }
    }
    console.log('rerender')

    return (
        <div onScroll={handleScroll} className={styles.home}>
            <ProductsList />
            {/* <div className={styles.products}>
            </div> */}
            <Sidebar />
            <UpButton
                style={{ display: scroll ? 'flex' : 'none' }}
                className={styles.up}
            />
        </div>
    )
}
