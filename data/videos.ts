export interface VideoItem {
  id: string;
  // PLACEHOLDER video sources — replace with real Instagram Reels / event films.
  src: string;
  poster: string;
  label: string;
}

export const videoItems: VideoItem[] = [
  {
    id: "v1",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    poster: "https://picsum.photos/seed/mfp-video-1/500/900",
    label: "Wedding Highlight",
  },
  {
    id: "v2",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    poster: "https://picsum.photos/seed/mfp-video-2/500/900",
    label: "Birthday Reel",
  },
  {
    id: "v3",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    poster: "https://picsum.photos/seed/mfp-video-3/500/900",
    label: "Corporate Event",
  },
];
