import { GetServerSideProps } from 'next'
import http from 'services/http-common'
import Layout from 'components/Layouts'
import { QueryClient, dehydrate } from 'react-query'
import { IPost, IUser } from 'types/interfaces'
import { getContentFromText, sanitizeTitle } from 'utils'
import PostPage from 'components/pages/Post'
import parse from 'node-html-parser'

interface Props {
  id: string
  latestCommentors: IUser[]
}

export default function Post({ id, latestCommentors }: Props) {
  return (
    <Layout
      pageTitle='News Article - Here News'
      type='home'
      className='!pt-0'
    >
      <PostPage id={id} latestCommentors={latestCommentors} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
  resolvedUrl
}) => {
  if (!params) {
    return {
      notFound: true
    }
  }

  const { id } = params

  try {
    const queryClient = new QueryClient()

    const getPostData = async () => {
      const response = await http.get(`/getSinglePost/${id}`)

      return {
        data: response.data.data as IPost
      }
    }

    const getPostReplies = async () => {
      const response = await http.get(`/getPostReplies/${id}`)

      return {
        data: response.data.data
      }
    }

    await queryClient.prefetchQuery({
      queryKey: ['getSinglePost', `getSinglePost/${id}`],
      queryFn: getPostData
    })

    await queryClient.prefetchQuery({
      queryKey: `getReplies/${id}`,
      queryFn: getPostReplies
    })

    /**
     * Getting the list of latest commentors
     */
    const repliesCache = queryClient.getQueryData(`getReplies/${id}`)

    const latestCommentors = new Map<string, IUser>()
    const replies = (repliesCache as any).data as IPost[]

    const users = replies.map(reply => reply.userId)

    for (let user of users) {
      if (latestCommentors.size > 4) {
        break
      }

      latestCommentors.set(user._id, user)
    }

    /**
     * Creating post meta tags
     */
    const cache = queryClient.getQueryData([
      'getSinglePost',
      `getSinglePost/${id}`
    ])
    const data: IPost = (cache as any).data

    if (!data) {
      return {
        notFound: true
      }
    }

    const htmlToFormattedText = require('html-to-formatted-text')

    let title = data.title
    let content = getContentFromText(data.text)

    // if still empty, then use content
    if (!title || title.trim().length === 0) {
      title = sanitizeTitle(htmlToFormattedText(data.text))
      content = ''
    }

    const testTitle = sanitizeTitle(title || '')

    // If title is still empty or undefined
    if (
      (!testTitle || testTitle.trim().length === 0) &&
      data.preview
    ) {
      title = data.preview.title
      content = data.preview.description
    }

    let imageUrl: string | undefined = undefined

    // if no image found, then try getting one from the embedded images
    if (!imageUrl && data.text) {
      const doc = parse(data.text)
      const tag = doc.querySelector('div[data-file], img')

      if (tag?.rawTagName === 'img' || tag?.tagName === 'img') {
        imageUrl = tag.getAttribute('src')
      } else if (
        tag?.rawTagName === 'div' ||
        tag?.tagName === 'div'
      ) {
        imageUrl = tag.getAttribute('data-url')
      }
    }

    if (!imageUrl && data.preview?.image) {
      imageUrl = data.preview?.image
    }

    // If still no image, then use the site logo
    if (!imageUrl) {
      const logo = await import('assets/logo.png')
      imageUrl = `https://${req.headers.host}${logo.default.src}`
    }

    title =
      title && title.length > 104
        ? title.slice(0, 104) + '...'
        : title

    const metaTags = data
      ? {
          'og:title': `${title ? `${title} - ` : ''}Here News`,
          'og:description': `${content}`,
          'og:image': imageUrl,
          'og:url': `${req.headers.host}${resolvedUrl}`
        }
      : {}

    return {
      props: {
        id,
        metaTags,
        latestCommentors: Array.from(latestCommentors.values()),
        dehydratedState: JSON.parse(
          JSON.stringify(dehydrate(queryClient))
        )
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
