import type { Config } from 'tailwindcss'

export default {
    content: ['./app/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            typography: ({ theme }) => ({
                dark: {
                    css: {
                        '--tw-prose-body': theme('colors.gray[300]'),
                        '--tw-prose-headings': theme('colors.white'),
                        '--tw-prose-lead': theme('colors.gray[200]'),
                        '--tw-prose-links': theme('colors.violet[300]'),
                        '--tw-prose-bold': theme('colors.white'),
                        '--tw-prose-counters': theme('colors.gray[400]'),
                        '--tw-prose-bullets': theme('colors.violet[300]'),
                        '--tw-prose-hr': theme('colors.gray[600]'),
                        '--tw-prose-quotes': theme('colors.white'),
                        '--tw-prose-quote-borders': theme('colors.gray[600]'),
                        '--tw-prose-captions': theme('colors.gray[400]'),
                        '--tw-prose-code': theme('colors.white'),
                        '--tw-prose-pre-code': theme('colors.gray[800]'),
                        '--tw-prose-pre-bg': theme('colors.black'),
                        '--tw-prose-th-borders': theme('colors.gray[600]'),
                        '--tw-prose-td-borders': theme('colors.gray[500]'),
                        '--tw-prose-invert-body': theme('colors.white'),
                        '--tw-prose-invert-headings': theme('colors.black'),
                        '--tw-prose-invert-lead': theme('colors.gray[200]'),
                        '--tw-prose-invert-links': theme('colors.violet[300]'),
                        '--tw-prose-invert-bold': theme('colors.white'),
                        '--tw-prose-invert-counters': theme('colors.gray[400]'),
                        '--tw-prose-invert-bullets':
                            theme('colors.violet[500]'),
                        '--tw-prose-invert-hr': theme('colors.gray[200]'),
                        '--tw-prose-invert-quotes': theme('colors.black'),
                        '--tw-prose-invert-quote-borders':
                            theme('colors.gray[200]'),
                        '--tw-prose-invert-captions': theme('colors.gray[400]'),
                        '--tw-prose-invert-code': theme('colors.black'),
                        '--tw-prose-invert-pre-code': theme('colors.white'),
                        '--tw-prose-invert-pre-bg': 'rgb(255 255 255 / 50%)',
                        '--tw-prose-invert-th-borders':
                            theme('colors.gray[200]'),
                        '--tw-prose-invert-td-borders':
                            theme('colors.gray[300]'),
                    },
                },
            }),
            fontFamily: {
                sans: ['Inter'],
            },
            colors: {
                highlight: {
                    900: '#D2FF30',
                    800: '#D6FF43',
                    700: '#DAFF56',
                },
            },
            keyframes: {
                slideDown: {
                    from: { height: '0px' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                slideUp: {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0px' },
                },
            },
            animation: {
                slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
                slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
        require('tailwind-hamburgers'),
        require('@tailwindcss/typography'),
    ],
} satisfies Config
