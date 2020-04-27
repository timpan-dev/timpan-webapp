type PubType = 'page' | 'post' | 'book'
type PostContextType = 'audio' | 'video' | 'image'
type BodyType = 'remark' | 'mdx'

interface IImageDesc {
  base64: string
  src: string
  srcSet: string
  aspectRatio: number
  sizes: string
  width: number
  height: number
  title: string
}

interface IAudioDesc {
  src: string
  size: number
  title: string
  youtube?: string
}

interface ITagDesc {
  name: string
  slug: string
  desc: string
  color: string
}

interface IAudioContext {
  items: IAudioDesc[]
}

interface IVideoContext {
  youtube: string
}

interface IImageContext {
  items: IImageDesc
}

interface IBookContext {
  cover: IImageDesc
  attachment: string
}

type AnyPostContext = IAudioContext | IVideoContext | IImageContext

interface IPubBase {
  id: string
  pubType: PubType
  title: string
  slug: string
  url: string
  desc: string
  renderer: BodyType // always mdx
  body: string
}

interface IPage extends IPubBase {
  pubType: 'page'
}

interface IPost extends IPubBase {
  pubType: 'post'
  date: Date
  contextType: PostContextType
  context: AnyPostContext
}

interface IBookPage extends IPubBase {
  pubType: 'book'
  date: Date
  contextType: 'book'
  context: IBookContext
}