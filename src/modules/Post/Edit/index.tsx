import { useRouter } from 'next/router'
import React from 'react'
import { useQueryClient } from 'react-query'
import { IPost } from 'types/interfaces'
import PostForm from '../common/form'
import { useAppDispatch } from 'store/hooks'
import { resetEditor } from 'store/slices/editor.slice'

interface EditPostProps extends IPost {
  handleCloseModal?: () => void
}

function EditPost({ _id, preview, text, title }: EditPostProps) {
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
      postId={_id}
      previewData={preview}
      initialValues={{
        content: text,
        title
      }}
      onAPICallSuccess={onAPICallSuccess}
      apiEndpoint={`/editPost/${_id}`}
    />
  )
}

export default EditPost
