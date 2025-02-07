import { SITE_BASE_URL } from '~/consts'

const LanguageSwitcher = () => {
    const languages = [
        { path: '', flag: 'spain.svg', alt: 'Español' },
        { path: '/en', flag: 'usa.svg', alt: 'English' },
        { path: '/zh', flag: 'china.svg', alt: '中文' },
    ]

    return (
        <div className="bottom-5 right-5 flex items-center gap-2">
            {languages.map((lang) => (
                <a
                    href={`${SITE_BASE_URL}${lang.path}`}
                    key={lang.path}
                    className={`h-6 w-6 rounded-full border-2 border-[#E4E4E4] transition-all hover:scale-110`}
                >
                    <img
                        src={`/${lang.flag}`}
                        alt={lang.alt}
                        className="h-full w-full rounded-full object-cover"
                    />
                </a>
            ))}
        </div>
    )
}

export default LanguageSwitcher
