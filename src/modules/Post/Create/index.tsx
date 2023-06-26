import { useRouter } from 'next/router'
import React from 'react'
import { useQueryClient } from 'react-query'
import { useAppDispatch } from 'store/hooks'
import { resetEditor } from 'store/slices/editor.slice'
import PostForm from '../common/form'

function CreatePost() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  const onAPICallSuccess = (data: any) => {
    // remove cache
    queryClient.invalidateQueries('getExplorePosts')
    queryClient.invalidateQueries('getTrendingPosts')
    queryClient.invalidateQueries('getSinglePost')

    dispatch(resetEditor())
    // redirect to post
    const postId = data?._id
    router.push(`/post/${postId}`)
  }

  return (
    <PostForm
      onAPICallSuccess={onAPICallSuccess}
      apiEndpoint='/createPost'
      actionLabel='Publish'
    />
  )
}

export default CreatePost
