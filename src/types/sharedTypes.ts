import { GatsbyImageSharpFixed_WithWebp_TracedSvgFragment
  , GatsbyImageSharpFluid_WithWebp_TracedSvgFragment } from './graphqlTypes'

export type PlayerDesc = {
  playerId: string
  stop: () => void
}

export interface IAppState {
  drawer: boolean
  pageWidth: number
  lastVisit: number
}

export interface IAction {
  type: string
}

export interface IPlayerRegAction extends IAction {
  player: PlayerDesc
}

export interface IPlayerUnregAction extends IAction {
  playerId: string
}

export interface IPlayerStartAction extends IAction {
  playerId: string
}

export interface IResizeAction extends IAction {
  width: number
}

export type AllAppActions =
  | IAction
  | IPlayerRegAction
  | IPlayerStartAction
  | IResizeAction

export interface IAppContext {
  state: IAppState
  dispatch: (action: AllAppActions) => void
}

export interface IPost {
  id: string
  title: string
  date: Date
  desc?: string
  type?: string
  urlPath: string
  source: string
  index?: number
  body: string
  cover?: GatsbyImageSharpFluid_WithWebp_TracedSvgFragment
  images?: {
    image: GatsbyImageSharpFluid_WithWebp_TracedSvgFragment
    title?: string
  }[]
  video?: string
}

export interface ITrack {
  index?: number
  title: string
  src: string
  filesize: number
}

export interface IAlbum {
  id: string
  title: string
  date: Date
  desc?: string
  tags?: string[]
  cover: {
    width: number
    height: number
    src: string
    srcSet: string 
    sizes?: string
    base64?: string
    srcWebp?: string
    srcSetWebp?: string
    aspectRatio?: number
    tracedSVG?: string
  }
  files: ITrack[]
  urlPath: string
  source: string
  renderer: string
  index?: number
  body: string
}


// type PubType = 'page' | 'post' | 'book'
// type PostContextType = 'audio' | 'video' | 'image'
// type BodyType = 'remark' | 'mdx'

// interface IImageDesc {
//   base64: string
//   src: string
//   srcSet: string
//   aspectRatio: number
//   sizes: string
//   width: number
//   height: number
//   title: string
// }

// interface IAudioDesc {
//   src: string
//   size: number
//   title: string
//   youtube?: string
// }

// interface ITagDesc {
//   name: string
//   slug: string
//   desc: string
//   color: string
// }

// interface IAudioContext {
//   items: IAudioDesc[]
// }

// interface IVideoContext {
//   youtube: string
// }

// interface IImageContext {
//   items: IImageDesc
// }

// interface IBookContext {
//   cover: IImageDesc
//   attachment: string
// }

// type AnyPostContext = IAudioContext | IVideoContext | IImageContext

// interface IPubBase {
//   id: string
//   pubType: PubType
//   title: string
//   slug: string
//   url: string
//   desc: string
//   renderer: BodyType // always mdx
//   body: string
// }

// interface IPage extends IPubBase {
//   pubType: 'page'
// }

// interface IPost extends IPubBase {
//   pubType: 'post'
//   date: Date
//   contextType: PostContextType
//   context: AnyPostContext
// }

// interface IBookPage extends IPubBase {
//   pubType: 'book'
//   date: Date
//   contextType: 'book'
//   context: IBookContext
// }

export interface IPlaylistState {
  playlist: ITrack[]
  currentTrack: ITrack
  currentTrackIndex: number
  playing: boolean
}

export interface IPlaylistActions {
  setPlaylist: (playlist: ITrack[]) => void
  setCurrentTrack: (index: number) => void
  setNextTrack: () => void
  setPrevTrack: () => void
  play: () => void
  pause: () => void
  toggle: () => void
}