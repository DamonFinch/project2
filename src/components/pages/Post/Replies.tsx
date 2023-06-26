import SinglePost from 'components/SinglePost/SinglePost'
import React from 'react'
import { useQuery } from 'react-query'
import http from 'services/http-common'
import { IPost } from 'types/interfaces'

interface RepliesProps {
  postId?: string
}

function Replies({ postId }: RepliesProps) {
  const getPostReplies = async () => {
    const response = await http.get(`/getPostReplies/${postId}`)

    return {
      data: response.data.data
    }
  }

  const { data } = useQuery({
    queryKey: `getReplies/${postId}`,
    queryFn: getPostReplies
  })

  const repliesList: IPost[] = data?.data

  return (
    <div className='w-full sm:max-w-[91.5%] self-end gap-4 flex flex-col items-stretch'>
      {repliesList?.map(reply => (
        <SinglePost {...reply} key={reply._id} />
      ))}
    </div>
  )
}

export default Replies
