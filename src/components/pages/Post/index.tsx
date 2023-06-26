import React from 'react'
import { useQuery } from 'react-query'
import { IPost, IUser } from 'types/interfaces'
import SinglePost from 'components/SinglePost/SinglePost'
import http from 'services/http-common'
import { BiLoader } from 'react-icons/bi'
import MiniPost from './MiniPost'
import Replies from './Replies'

interface Props {
  id: string
  latestCommentors: IUser[]
}

const PostPage = ({ id, latestCommentors }: Props) => {
  const getPostData = async () => {
    const response = await http.get(`/getSinglePost/${id}`)

    return {
      data: response.data.data
    }
  }

  const { isLoading, data } = useQuery({
    queryKey: ['getSinglePost', `getSinglePost/${id}`],
    queryFn: getPostData
  })

  const post = data?.data as IPost

  if (!post) {
    return <p>No data found</p>
  } else if (isLoading) {
    return <BiLoader />
  }

  return (
    <>
      {post.repliedTo && <MiniPost {...post.repliedTo} />}

      <div className='flex flex-col items-stretch w-full max-w-[57.75rem] gap-4 mt-5 px-2'>
        <SinglePost
          {...post}
          commentors={latestCommentors}
          focused={true}
        />

        <Replies postId={post._id} />
      </div>
    </>
  )
}

export default PostPage
