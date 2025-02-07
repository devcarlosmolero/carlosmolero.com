import { ChevronRight } from 'lucide-react'

const Button = ({ text, url }: { text: string; url: string }) => {
    return (
        <a
            className="flex w-full items-center gap-x-3 rounded-md border border-[#E4E4E4] px-4 py-2 text-center md:min-w-[50%]"
            href={url}
            target="_blank"
        >
            <p className="w-full">{text}</p>
            <ChevronRight className="size-4" />
        </a>
    )
}

export default Button
