import { MetaFunction } from '@remix-run/cloudflare'
import { ChevronRightIcon } from 'lucide-react'
import ImageKitImage from '~/components/atoms/ImageKitImage'
import Card from '~/components/templates/Card'
import Page from '~/components/templates/Page'
import { getBasicMetas } from '~/utils/metas'

export const meta: MetaFunction = () => {
    return [
        ...getBasicMetas({
            title: 'Galería de Diseño UX/UI Profesional',
            description: `"Descubre nuestra Galería de Diseño UX/UI Profesional para Empresas. Soluciones creativas y 
            funcionales que mejoran la experiencia de usuario y potencian tu marca. ¡Transforma tu proyecto hoy!`,
        }),
    ]
}

export default function GaleriaDeDisenoUXUIPage() {
    return (
        <Page>
            <div className="flex flex-col gap-y-5">
                <a target="_blank" href="https://dribbble.com/carlosmmta">
                    <Card className="group flex w-fit animate-bounce items-center gap-x-2 !rounded-full !py-2">
                        <img
                            src="https://www.svgrepo.com/show/217757/dribbble.svg"
                            className="h-[20px] w-[20px] md:h-[30px] md:w-[30px]"
                        />
                        <p className="text-sm md:text-base">
                            Síguenos en Dribbble
                        </p>
                        <ChevronRightIcon className="size-4" />
                    </Card>
                </a>
                <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                    {[
                        {
                            key: '/tr:f-webp/tuenix-diseno',
                        },
                        {
                            key: '/tr:f-webp/ujung-diseno-1.jpg',
                        },
                        {
                            key: '/tr:f-webp/ujung-diseno-2.jpg',
                        },
                    ].map((image, index) => {
                        return (
                            <div className="aspect-h-3 aspect-w-4 cursor-pointer">
                                <ImageKitImage
                                    className="rounded-xl"
                                    src={image.key}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </Page>
    )
}
