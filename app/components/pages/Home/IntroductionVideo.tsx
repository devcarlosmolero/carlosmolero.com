import LazyLoad from 'react-lazy-load'

export default function IntroductionVideo() {
    return (
        <div id="video">
            <LazyLoad className="aspect-h-9 aspect-w-16 min-h-[269px]">
                <iframe
                    className="rounded-xl shadow shadow-zinc-700"
                    src="https://www.youtube.com/embed/yhUBSCdRN8g?si=yUfxdVE9filMaxO7&autoplay&mute=1"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </LazyLoad>
        </div>
    )
}
