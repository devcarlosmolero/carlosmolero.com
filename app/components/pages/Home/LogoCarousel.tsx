import useEmblaCarousel from 'embla-carousel-react'
import Autoscroll from 'embla-carousel-auto-scroll'
import { Fragment } from 'react/jsx-runtime'

export default function LogoCarousel({ heading }: { heading: string }) {
    const [emblaRef] = useEmblaCarousel({ loop: true, watchDrag: false }, [
        Autoscroll({ speed: 0.5 }),
    ])

    const logos = [
        {
            src: 'https://ik.imagekit.io/jgh04cawf/novascriptio/sprinter-logo.svg?updatedAt=1718234225973',
            alt: '',
            invert: false,
        },
        {
            src: 'https://ik.imagekit.io/jgh04cawf/novascriptio/voicit-logo.png?updatedAt=1718235168911',
            alt: '',
            invert: false,
        },
        {
            src: 'https://ik.imagekit.io/jgh04cawf/novascriptio/mmabogada-logo.svg?updatedAt=1718670926437',
            alt: '',
            invert: true,
        },
        {
            src: 'https://ik.imagekit.io/jgh04cawf/novascriptio/caroda-logo.svg?updatedAt=1718234225925',
            alt: '',
            invert: false,
        },
        {
            src: 'https://ik.imagekit.io/jgh04cawf/novascriptio/crewtive-logo.png?updatedAt=1718234225804',
            alt: '',
            invert: false,
        },
        {
            src: 'https://ik.imagekit.io/jgh04cawf/novascriptio/peakz-logo.svg?updatedAt=1718671280344',
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
                                    src={logo.src}
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
