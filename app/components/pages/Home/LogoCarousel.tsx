import useEmblaCarousel from 'embla-carousel-react'
import Autoscroll from 'embla-carousel-auto-scroll'
import { Fragment } from 'react/jsx-runtime'
import { IMAGE_KIT_BASE_URL } from '~/consts'

export default function LogoCarousel({ heading }: { heading: string }) {
    const [emblaRef] = useEmblaCarousel({ loop: true, watchDrag: false }, [
        Autoscroll({ speed: 0.5 }),
    ])

    const logos = [
        {
            src: '/sprinter-logo.svg?updatedAt=1718234225973',
            alt: '',
            invert: false,
        },
        {
            src: '/voicit-logo.png?updatedAt=1718235168911',
            alt: '',
            invert: false,
        },
        {
            src: '/mmabogada-logo.svg?updatedAt=1718670926437',
            alt: '',
            invert: true,
        },
        {
            src: '/caroda-logo.svg?updatedAt=1718234225925',
            alt: '',
            invert: false,
        },
        {
            src: '/crewtive-logo.png?updatedAt=1718234225804',
            alt: '',
            invert: false,
        },
        {
            src: '/peakz-logo.svg?updatedAt=1718671280344',
            alt: '',
            invert: true,
        },
    ]

    return (
        <Fragment>
            <div className="text-md mb-12 text-center text-gray-300">
                {heading}
            </div>
            <div className="embla gradient-border" ref={emblaRef}>
                <div className="embla__container gradient-content">
                    {logos.map((logo, index) => {
                        return (
                            <div key={index} className="embla__slide">
                                <img
                                    width="100%"
                                    className={`${logo.invert ? 'invert' : ''} grayscale`}
                                    src={`${IMAGE_KIT_BASE_URL}/${logo.src}`}
                                    alt={logo.alt}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </Fragment>
    )
}
