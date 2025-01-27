import { MetaFunction } from '@remix-run/cloudflare'
import { Fragment, SyntheticEvent, useState } from 'react'
import Accordion from '~/components/organisms/Accordion'
import SectionHeading from '~/components/pages/Home/SectionHeading'
import Page from '~/components/templates/Page'
import { Input as ShaCDNInput } from '~/components/atoms/ui/input'
import { getBasicMetas, getFaqsJsonLd } from '~/utils/metas'

const faqs = [
    {
        question: '¿Qué es una marca de agua en una imagen?',
        answer: 'Una marca de agua es un texto, logo o gráfico superpuesto sobre una imagen para identificar al creador, proteger los derechos de autor o promocionar una marca. Suele ser semitransparente para no interferir demasiado con la visualización de la imagen.',
    },
    {
        question: '¿Por qué es importante usar marcas de agua en las imágenes?',
        answer: 'Las marcas de agua protegen la propiedad intelectual, evitan el uso no autorizado de las imágenes y promueven la marca o autor cuando se comparten en línea. También sirven como una forma de disuadir la copia o distribución ilegal del contenido.',
    },
    {
        question: '¿Cómo se añade una marca de agua a una imagen?',
        answer: 'Puedes añadir una marca de agua utilizando herramientas de edición como Photoshop, GIMP o aplicaciones en línea. Estas permiten superponer texto, logos o gráficos, ajustando su transparencia, tamaño y posición para que no afecte demasiado la imagen original.',
    },
];

export const meta: MetaFunction = () => {
    return [
        ...getBasicMetas({
            title: '⚙️ Marca de Agua Online Gratis',
            description: `Utiliza nuestra herramienta 100% gratuita para añadir una marca de agua a tus imágenes con un texto personalizado, conservando su calidad.`,
        }),
        {
            'script:ld+json': [getFaqsJsonLd(faqs)],
        },
    ]
}

export default function AgregadorMarcaDeAguaOnlinePage() {
    return (
        <Page>
            <div className="flex flex-col">
                <SectionHeading
                    asH1
                    title="Añade una marca de agua a tus imágenes"
                    description="Utiliza nuestra herramienta 100% gratuita para añadir una marca de agua a tus imágenes con un texto personalizado, conservando su calidad."
                />
                <div className="grid grid-cols-1 gap-10 md:grid-cols-1">
                    <div className="flex flex-col gap-y-5">
                        <WatermarkImage />
                    </div>
                </div>
            </div>
            <div>
                <SectionHeading
                    title="Preguntas y respuestas sobre las marcas de agua"
                    description="Si no sabes muy bien qué hace esta herramienta ¡No te preocupes! Despejamos todas tus dudas acerca de los que son las marcas de agua y por qué son importantes."
                />
                <Accordion data={faqs} />
            </div>
        </Page>
    )
}

import React, { useRef, useEffect } from 'react'
import { ColorPicker } from '~/components/atoms/ui/color-picker'
import { Slider } from '~/components/atoms/ui/slider'
import Button from '~/components/atoms/Button'
import Input from '~/components/atoms/Input'

const WatermarkImage = () => {
    const canvasRef = useRef(null)
    const [image, setImage] = useState(null)
    const [uploadedImage, setUploadedImage] = useState(null)
    const [color, setColor] = useState('#ffffff') 
    const [opacity, setOpacity] = useState(0.5) 
    const [watermarkText, setWatermarkText] = useState('') 
    const [rotation, setRotation] = useState(-45) 
    const [spacing, setSpacing] = useState(100) 

    const handleImageUpload = (event: SyntheticEvent) => {
        const file = (event.target as HTMLInputElement)!.files![0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e: Event) => {
                const img = new Image()
                // @ts-expect-error idk
                img.src = e.target.result
                img.onload = () => {
                    // @ts-expect-error idk
                    setUploadedImage(img)
                    // @ts-expect-error idk
                    setImage(img)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    useEffect(() => {
        if (image) {
            drawWatermark(image)
        }
    }, [image, watermarkText, color, opacity, rotation, spacing])

    const drawWatermark = (img: HTMLImageElement) => {
        const canvas = canvasRef.current as any as HTMLCanvasElement
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        canvas.width = img.width
        canvas.height = img.height

        ctx.drawImage(img, 0, 0, img.width, img.height)

        ctx.font = '20px Arial'
        ctx.fillStyle = `rgba(${hexToRgb(color)}, ${opacity})`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        const angle = (rotation * Math.PI) / 180

        for (let x = -canvas.width; x < canvas.width; x += spacing) {
            for (let y = -canvas.height; y < canvas.height; y += spacing) {
                ctx.save()
                ctx.translate(x, y)
                ctx.rotate(angle)
                ctx.fillText(watermarkText, 0, 0)
                ctx.restore()
            }
        }
    }

    const hexToRgb = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `${r}, ${g}, ${b}`
    }

    return (
        <Fragment>
            <div className="grid md:grid-cols-2 items-start gap-5">
                <div className="flex flex-col">
                    <label htmlFor={''} className="mb-2 ml-2 text-gray-200">
                        Selecciona una imagen (*)
                    </label>
                    <ShaCDNInput
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    <Button className="mt-5" variant="primary">
                        Descargar
                    </Button>
                </div>
                <div className="flex flex-col gap-y-5">
                    <Input
                        labelProps={{ text: 'Texto de la marca de agua' }}
                        inputProps={{
                            value: watermarkText,
                            onChange: (e) => setWatermarkText(e.target.value),
                            placeholder: 'Texto',
                        }}
                    />
                    <div className="flex gap-5">
                        <label>Color:</label>
                        <ColorPicker value={color} onChange={setColor} />
                    </div>
                    <div className="flex gap-5">
                        <label>Opacidad:</label>
                        <Slider defaultValue={[opacity]} onValueChange={(value)=> setOpacity(value[0])} max={1} step={0.1} />
                    </div>
                    <div className="flex gap-5">
                        <label>Rotación:</label>
                        <Slider defaultValue={[rotation]} onValueChange={(value)=> setRotation(value[0])} min={-360} max={360} step={1} />
                    </div>
                    <div className="flex gap-5">
                        <label>Espaciado:</label>
                        <Slider defaultValue={[spacing]} onValueChange={(value)=> setSpacing(value[0])} min={50} max={150} step={1} />
                    </div>
                </div>
            </div>

            {image && (
                <canvas
                    ref={canvasRef}
                    style={{
                        border: '1px solid black',
                        maxWidth: '100%',
                    }}
                    className='mt-5'
                />
            )}
        </Fragment>
    )
}
