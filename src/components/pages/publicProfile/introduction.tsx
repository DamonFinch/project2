import VotesCounter from 'components/SinglePost/VotesCounter'
import Icon from 'components/core/Icon'
import Typography from 'components/core/Typography'
import Link from 'next/link'
import React from 'react'
import { IPost } from 'types/interfaces'

const IntroductoryPost = ({
  _id: postId,
  upvotes,
  downvotes,
  tips,
  totalVotes,
  title,
  text,
  userId
}: IPost) => {
  return (
    <div className='flex flex-col gap-4 p-4 bg-baseWhite border-frameStroke rounded-t-lg'>
      <div className='flex flex-row justify-between items-center'>
        {/* Voting counter */}
        <VotesCounter
          posterID={userId as unknown as string}
          postId={postId}
          upvotes={upvotes}
          tips={tips}
          totalVotes={totalVotes}
          downvotes={downvotes}
          horizontal
        />

        {/* Maximize button to link to the post */}
        <Link
          href={`/post/${postId}`}
          className='grid place-items-center rounded-[8px] h-12 w-12 bg-historic no-underline'
        >
          <Icon name='maximizePrimary' raw />
        </Link>
      </div>

      <div className='flex flex-col px-1'>
        <Typography
          type='subtitle-small'
          className='!text-xl font-medium text-header'
        >
          {title}
        </Typography>

        <p
          dangerouslySetInnerHTML={{ __html: text || '' }}
          className='!text-base !leading-[1.6rem] text-body'
        />
      </div>
    </div>
  )
}

export default IntroductoryPost
