import { MoreIcon } from '@/entities/more'
import { IProduct, ProductCard } from '@/entities/product-card'
import { ErrorElement } from '@/shared/ui/error'
import { ProductCardSkeleton } from '@/shared/ui/skeleton'
import { useGetMyProducts } from '..'
import styles from './styles.module.scss'

export const MyProducts = () => {
    const { data, isLoading, isError, error } = useGetMyProducts()
    console.log(data)
    return (
        <>
            {isLoading ? (
                new Array(6).fill(0).map((_, i) => (
                    <ProductCard style={{ display: 'block' }} key={i}>
                        <ProductCardSkeleton />
                    </ProductCard>
                ))
            ) : isError ? (
                <ErrorElement message={error?.message || ''} />
            ) : (
                data.results?.map((product: IProduct) => (
                    <ProductCard
                        action={
                            <MoreIcon
                                actions={
                                    <ul>
                                        <li>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="20"
                                                viewBox="0 0 24 20"
                                                fill="none"
                                            >
                                                <path
                                                    d="M4.26074 5.83333H19.6774M10.042 9.16667V14.1667M13.8962 9.16667V14.1667M5.22428 5.83333L6.18783 15.8333C6.18783 16.2754 6.39086 16.6993 6.75225 17.0118C7.11365 17.3244 7.60381 17.5 8.11491 17.5H15.8232C16.3343 17.5 16.8245 17.3244 17.1859 17.0118C17.5473 16.6993 17.7503 16.2754 17.7503 15.8333L18.7139 5.83333M9.07845 5.83333V3.33333C9.07845 3.11232 9.17997 2.90036 9.36067 2.74408C9.54136 2.5878 9.78644 2.5 10.042 2.5H13.8962C14.1517 2.5 14.3968 2.5878 14.5775 2.74408C14.7582 2.90036 14.8597 3.11232 14.8597 3.33333V5.83333"
                                                    stroke="white"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            Удалить объявление
                                        </li>
                                        <li>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                            >
                                                <path
                                                    d="M9.50018 15.1342L15.6635 8.97083C14.6266 8.5379 13.6848 7.90535 12.8918 7.10917C12.0953 6.31601 11.4625 5.37398 11.0293 4.33667L4.86601 10.5C4.38518 10.9808 4.14435 11.2217 3.93768 11.4867C3.6936 11.7994 3.48431 12.1378 3.31351 12.4958C3.16935 12.7992 3.06185 13.1225 2.84685 13.7675L1.71185 17.17C1.65961 17.3258 1.65186 17.4931 1.68947 17.653C1.72707 17.813 1.80855 17.9593 1.92474 18.0754C2.04093 18.1916 2.18722 18.2731 2.34717 18.3107C2.50712 18.3483 2.67439 18.3406 2.83018 18.2883L6.23268 17.1533C6.87851 16.9383 7.20101 16.8308 7.50434 16.6867C7.86268 16.5158 8.20101 16.3067 8.51351 16.0625C8.77851 15.8558 9.01934 15.615 9.50018 15.1342ZM17.3735 7.26083C17.988 6.64631 18.3333 5.81283 18.3333 4.94375C18.3333 4.07468 17.988 3.2412 17.3735 2.62667C16.759 2.01214 15.9255 1.6669 15.0564 1.6669C14.1874 1.6669 13.3539 2.01214 12.7393 2.62667L12.0002 3.36583L12.0318 3.45833C12.3961 4.5006 12.9922 5.44659 13.7752 6.225C14.5769 7.03142 15.556 7.63926 16.6343 8L17.3735 7.26083Z"
                                                    fill="white"
                                                />
                                            </svg>
                                            Изменить объявление
                                        </li>
                                    </ul>
                                }
                            />
                        }
                        key={product.id}
                        product={product}
                    />
                ))
            )}
        </>
    )
}
