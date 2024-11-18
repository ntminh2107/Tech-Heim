import { Comments } from './Comment'

export type Blog = {
  id: string
  title: string
  author: string
  readTime: string
  tags: string[]
  releaseDate: Date
  content: string
  image: string
  comment?: Comments[]
}

export type VideoBlog = {
  id: number
  title: string
  url: string
  image: string
}
