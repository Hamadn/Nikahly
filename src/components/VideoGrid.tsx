'use client'

import { HeroVideoDialog } from "./Video"

interface VideoItem {
  title: string
  videoSrc: string
  thumbnailSrc: string
  thumbnailAlt: string
}

const videos: VideoItem[] = [
  {
    title: "Video 1",
    videoSrc: "https://www.youtube.com/embed/weW8nChcwUM?si=iREl_JlVz2scVr0z",
    thumbnailSrc: "/video_one.jpg",
    thumbnailAlt: "Video 1 Thumbnail"
  },
  {
    title: "Video 2",
    videoSrc: "https://www.youtube.com/embed/dzduUELzxk0?si=1_SuEwhnh456m3hh",
    thumbnailSrc: "/video_two.jpg",
    thumbnailAlt: "Video 2 Thumbnail"
  },
  {
    title: "Video 3",
    videoSrc: "https://www.youtube.com/embed/dN7aURgmwWk?si=j0nXGU256LBLDUSJ",
    thumbnailSrc: "/video_three.jpg",
    thumbnailAlt: "Video 3 Thumbnail"
  },
  {
    title: "Video 4",
    videoSrc: "https://www.youtube.com/embed/IeDU0MJpt8U?si=lpJ5z6yogRGb4kwx",
    thumbnailSrc: "/video_four.jpg",
    thumbnailAlt: "Video 4 Thumbnail"
  },
  {
    title: "Video 5",
    videoSrc: "https://www.youtube.com/embed/MiPQenCXHTk?si=JkIi4ucVUSGUsy4Q",
    thumbnailSrc: "/video_five.jpg",
    thumbnailAlt: "Video 5 Thumbnail"
  },
  {
    title: "Video 6",
    videoSrc: "https://www.youtube.com/embed/utvknHp6Tn0?si=Xhy9NrUeK_CeM6Fa",
    thumbnailSrc: "/video_six.jpg",
    thumbnailAlt: "Video 6 Thumbnail"
  },
  {
    title: "Video 7",
    videoSrc: "https://www.youtube.com/embed/BkikyL535lM?si=kbw6NnPPFEAZm4zE",
    thumbnailSrc: "/video_seven.jpg",
    thumbnailAlt: "Video 7 Thumbnail"
  },
  {
    title: "Video 8",
    videoSrc: "https://www.youtube.com/embed/OlKVj0FU4pM?si=L-ZVyKwL2r8Pspoq",
    thumbnailSrc: "/video_eight.jpg",
    thumbnailAlt: "Video 8 Thumbnail"
  },
  {
    title: "Video 9",
    videoSrc: "https://www.youtube.com/embed/Pxe93DCBA1c?si=iOgqKuMiZHyE-BH3",
    thumbnailSrc: "/video_nine.jpg",
    thumbnailAlt: "Video 9 Thumbnail"
  },
  {
    title: "Video 10",
    videoSrc: "https://www.youtube.com/embed/zJNkUqaCKg0?si=PjcfXn3grbLBHyHu",
    thumbnailSrc: "/video_ten.jpg",
    thumbnailAlt: "Video 10 Thumbnail"
  },
  {
    title: "Video 11",
    videoSrc: "https://www.youtube.com/embed/UnPXG7CdUsg?si=LJefDfLptZJRJhSA",
    thumbnailSrc: "/video_eleven.jpg",
    thumbnailAlt: "Video 11 Thumbnail"
  },
  {
    title: "Video 12",
    videoSrc: "https://www.youtube.com/embed/hGV0flK__I4?si=UgD1AabSxZ4TOyG-",
    thumbnailSrc: "/video_twelve.jpg",
    thumbnailAlt: "Video 12 Thumbnail"
  }
]

export function VideoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video, index) => (
        <HeroVideoDialog
          key={index}
          animationStyle="from-center"
          videoSrc={video.videoSrc}
          thumbnailSrc={video.thumbnailSrc}
          thumbnailAlt={video.thumbnailAlt}
          className="aspect-video"
        />
      ))}
    </div>
  )
}
