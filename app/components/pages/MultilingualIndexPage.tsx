import { Linkedin, TwitterX, Whatsapp } from 'react-bootstrap-icons'
import Button from '~/components/atoms/Button'
import { SITE_LINKEDIN_URL, SITE_X_URL } from '~/consts'
import LanguageSwitcher from '../organisms/LanguageSwitcher'

export default function MultilingualIndexPage({
    translation,
}: {
    translation: any
}) {
    return (
        <div className="flex max-w-[600px] flex-col items-center justify-center gap-y-5">
            <img
                className="h-[100px] w-[100px]"
                alt="Carlos Molero"
                src={'./carlos-molero.png'}
            />
            <h1 className="flex flex-col text-center text-2xl font-semibold">
                {translation.name}{' '}
                <p className="text-base font-normal">{translation.title}</p>
            </h1>
            <LanguageSwitcher />
            <div className="space-y-3 text-center text-base">
                <p
                    dangerouslySetInnerHTML={{
                        __html: translation.intro,
                    }}
                />
                {translation.paragraphs.map((paragraph: any, index: number) => (
                    <p
                        key={index}
                        dangerouslySetInnerHTML={{
                            __html: paragraph,
                        }}
                    />
                ))}
            </div>
            <div className="flex w-full flex-col items-center gap-x-2 gap-y-2 md:flex-row">
                <Button
                    text={translation.button1}
                    url={'https://www.dev.carlosmolero.com'}
                />
                <Button
                    text={translation.button2}
                    url={'https://www.psicologo.carlosmolero.com'}
                />
            </div>
            <div className="flex items-center gap-2">
                <a
                    href={'https://wa.link/cvvbvq'}
                    target="_blank"
                    className="rounded-full border border-gray-600 p-2 text-gray-600 hover:border-black hover:text-black"
                    rel="noreferrer"
                >
                    <Whatsapp className="size-3" />
                </a>
                <a
                    href={SITE_X_URL}
                    target="_blank"
                    className="rounded-full border border-gray-600 p-2 text-gray-600 hover:border-black hover:text-black"
                    rel="noreferrer"
                >
                    <TwitterX className="size-3" />
                </a>
                <a
                    href={SITE_LINKEDIN_URL}
                    target="_blank"
                    className="rounded-full border border-gray-600 p-2 text-gray-600 hover:border-black hover:text-black"
                    rel="noreferrer"
                >
                    <Linkedin className="size-3" />
                </a>
            </div>
        </div>
    )
}
