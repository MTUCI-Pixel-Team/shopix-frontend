import { ProductsList } from '@/widgets/productsList'
import styles from './styles.module.scss'

export const Home = () => {
    // const options = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' },
    // ]
    return (
        <div className={styles.home}>
            <div className={styles.products}>
                <ProductsList />
            </div>
            <h1>Фильтры</h1>
            {/* <h1>Hello world</h1>
            <LayoutHeader />
            <Button size="small">Применить</Button>
            <Button size="big">Применить</Button>
            <Stars size="big" edit={true} />
            <Select options={options} placeholder="Select" />
            <Input placeholder="Введите текст..." />
            <ErrorElement color="dark" message="123" />
            <EmptyElement color="dark" />
            <form action="">
                <div>
                    <Checkbox id="pass" />
                    <label htmlFor="pass">hello</label>
                </div>
            </form>
            <Slider /> */}
        </div>
    )
}
