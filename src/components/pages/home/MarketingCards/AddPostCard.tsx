import Typography from 'components/core/Typography'
import React, { useCallback } from 'react'
import Pattern from 'assets/pattern.png'
import addPostCard from 'assets/marketingCards/addPostCard.svg'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { toggleIsLoginModalVisible } from 'store/slices/auth.slice'
import { showEditorModal } from 'store/slices/editor.slice'
import Image from 'next/image'

const AddPostCard = () => {
  const selectedUser = useAppSelector(
    state => state.auth.selectedAccount?._id
  )
  const dispatch = useAppDispatch()

  const openAddPostModal = useCallback(() => {
    if (!selectedUser) {
      dispatch(toggleIsLoginModalVisible(true))
      return
    }

    dispatch(showEditorModal())
  }, [selectedUser, dispatch])

  return (
    <div
      onClick={openAddPostModal}
      className='rounded-lg p-4 !pr-3 mb-4 cursor-pointer'
      style={{
        background: `url(${Pattern.src}), #D7C6FE`,
        backgroundBlendMode: 'color-burn, normal'
      }}
    >
      <div className='flex flex-row gap-[0.4375rem]'>
        {/* Content */}
        <Typography
          type='h2'
          className='!text-xl leading-7 font-medium text-primary'
        >
          Add your news or contribute an article
        </Typography>

        {/* Boxes */}
        <Image
          src={addPostCard}
          alt='Add your news or contribute an article'
        />
      </div>
    </div>
  )
}

export default AddPostCard
