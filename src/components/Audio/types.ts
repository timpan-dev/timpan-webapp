export type TimeRange = {
  start: number
  end: number
}

export interface IAudioState {
  initialized: boolean
  playing: boolean
  duration: number
  position: number
  buffered: [number, number][]
  canPlay: boolean
  canPlayThrough: boolean
  downloadUrl?: string
  filesize?: number
}

export interface IAudioActions {
  play: () => void
  pause: () => void
  toggle: () => void
  setPosition: (pos: number) => void
}
