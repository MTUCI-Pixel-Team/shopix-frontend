import { Checkbox } from '@/shared/ui/checkbox'
import { useState } from 'react'
import styles from './styles.module.scss'

export const Filters = () => {
    const [selectedFilters, setSelectedFilters] = useState<Array<number>>([])

    const handleFilterChange = (index: number) => {
        setSelectedFilters(prevFilters => {
            if (prevFilters.includes(index)) {
                return prevFilters.filter(filter => filter !== index)
            } else {
                return [...prevFilters, index]
            }
        })
    }

import axios from 'axios';

const getItems = async () => {
    const params = {
        page: 1,
        sort_by: '-created_at',
        category: ['category1', 'category2'], // предполагается, что категории - это массив
        search: 'search term',
        min_price: 100,
        max_price: 200
    };

    try {
        const response = await axios.get('http://your-api-url.com', { params });
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

getItems();


const installFilters = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
}

return (
    <div className={styles.sidebar}>
        <form onSubmit={installFilters}>
            <Search />
            <div className={styles.sort}>
                <h2>Сортировать:</h2>
                <Sort options={options} />
            </div>
            <div className={styles.filters}>
                <h2>Фильтры: </h2>
                <Filters />
            </div>
            <button type="submit">Применить фильтры</button>
        </form>
    </div>
)