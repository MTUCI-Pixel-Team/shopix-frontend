import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
//@ts-expect-error it's correct
import Slider from 'react-slick'
import './styles.scss'
import { ImagesDrop } from '@/entities/images-drop'
import Skeleton from 'react-loading-skeleton'

export const ImageSlider = ({
    images,
    setImages,
    isChange,
    errorMessage,
    isLoading,
}: {
    images: (string | File)[]
    isChange: boolean
    setImages: (images: (File | string)[]) => void
    errorMessage: string
    isLoading?: boolean
}) => {
    const settings = {
        customPaging: function (i: number) {
            return (
                <a className={'dot'}>
                    <img
                        src={
                            typeof images[i] === 'string'
                                ? (images[i] as string)
                                : images[i] instanceof File
                                  ? (URL.createObjectURL(
                                        images[i] as File,
                                    ) as string)
                                  : undefined
                        }
                    />
                </a>
            )
        },
        adaptiveHeight: false,
        variableWidth: false,
        centerPadding: 0,
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dotsClass: 'dots',
        className: 'slick',
        nextArrow: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="36"
                viewBox="0 0 21 36"
                fill="none"
            >
                <path
                    d="M1.35181 1.79557L19.9997 18.108L1.35181 34.4204"
                    stroke="#1D1C1C"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        ),
        prevArrow: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="36"
                viewBox="0 0 21 36"
                fill="none"
            >
                <path
                    d="M19.6479 34.4202L1.00004 18.1078L19.6479 1.79541"
                    stroke="#1D1C1C"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        ),
    }

    return (
        <div className={'slider'}>
            {isLoading ? (
                <Skeleton
                    width={'100%'}
                    style={{ position: 'relative', top: '-2px', left: '0' }}
                    height={'100%'}
                    borderRadius={'16px'}
                    baseColor="var(--second-primary)"
                />
            ) : isChange ? (
                <>
                    <ImagesDrop
                        className={'slider-change'}
                        images={images}
                        setImages={setImages}
                    />
                    {errorMessage}
                </>
            ) : (
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <div key={index}>
                            <img
                                src={
                                    typeof image === 'string'
                                        ? image
                                        : URL.createObjectURL(
                                              image || new Blob(),
                                          )
                                }
                                alt={`Slide ${index}`}
                            />
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    )
}
