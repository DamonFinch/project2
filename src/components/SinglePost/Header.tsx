import Typography from 'components/core/Typography'
import formatDistance from 'date-fns/formatDistance'
import React, { useMemo } from 'react'
import { IPost } from 'types/interfaces'
import VotesCounter from './VotesCounter'
import Link from 'next/link'
import Avatar from 'components/Avatar'

interface Props {
  post: IPost
  focused?: boolean
}

const SinglePostHeader = ({ post, focused }: Props) => {
  const {
    createdAt,
    upvotes,
    downvotes,
    tips,
    _id: postId,
    totalVotes,
    repliedTo,
    userId: { userIdHash, _id: userId, displayName, avatar, verified }
  } = post

  const time = useMemo(
    () =>
      formatDistance(new Date(createdAt), new Date(), {
        addSuffix: true
      }),
    [createdAt]
  )

  return (
    <div
      className={`sticky flex z-10 w-full flex-row items-center py-2 sm:py-[0.9375rem] bg-baseWhite ${
        focused && repliedTo ? 'top-[7.6rem]' : 'top-[4.5rem]'
      }`}
    >
      <Avatar
        imageUrl={avatar}
        iamgeClassNames='!p-0 object-cover object-center'
        containerClassNames='rounded-full shrink-0 w-[2.3125rem] h-[2.3125rem] mr-[0.5625rem] block sm:hidden'
      />

      <div className='flex flex-row flex-1 justify-between items-center'>
        <div className='flex flex-col'>
          <div className='flex flex-row gap-1'>
            <Link
              href={`/publicProfile/${userId}`}
              className='no-underline'
            >
              <Typography
                type='subtitle-small'
                className='font-medium !text-base !leading-[1.2rem] sm:!text-xl text-primary'
              >
                {verified ? displayName : userIdHash}
              </Typography>
            </Link>

            {/* {verified && (
              <Typography
                type='body'
                className='!text-base hidden sm:block !leading[1.6rem] text-grayMedium'
              >
                @{userIdHash}
              </Typography>
            )} */}
          </div>

          <div className='flex flex-row items-center gap-1'>
            {/* {verified && (
              <Typography
                type='body'
                className='!text-xs block sm:hidden mr-1 !leading[1.6rem] text-grayMedium'
              >
                @{userIdHash}
              </Typography>
            )} */}

            <div className='w-1 h-1 rounded-full bg-grayMd' />

            <Typography
              type='body'
              className='text-grayMd !text-[0.625rem] sm:!text-xs !leading-[1.2rem]'
            >
              {time}
            </Typography>
          </div>
        </div>

        <VotesCounter
          totalVotes={totalVotes}
          upvotes={upvotes}
          downvotes={downvotes}
          tips={tips}
          postId={postId}
          posterID={userId}
        />
      </div>
    </div>
  )
}

export default SinglePostHeader
