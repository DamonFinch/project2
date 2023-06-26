import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import formatDistance from 'date-fns/formatDistance'
import { IPost } from 'types/interfaces'
import Typography from 'components/core/Typography'
import Icon from 'components/core/Icon'
import { sanitizeTitle } from 'utils'
// @ts-ignore
import htmlToFormattedText from 'html-to-formatted-text'

function PostTicket({
  _id,
  createdAt,
  userId,
  title: initialTitle,
  totalVotes,
  upvotes,
  text,
  preview,
  replies
}: IPost) {
  const router = useRouter()

  const title = useMemo(
    () =>
      sanitizeTitle(
        initialTitle ||
          preview?.title ||
          htmlToFormattedText(text) ||
          '',
        false
      ),
    [initialTitle, text, preview]
  )

  const onClickCard = (e: any) => {
    if (
      e.target.localName !== 'svg' &&
      ![
        'external-link-1',
        'external-link-2',
        'external-link-3'
      ].includes(e.target.id)
    ) {
      router.push(`/post/${_id}`)
    }
  }

  return (
    <div
      onClick={(e: any) => {
        onClickCard(e)
      }}
      className={`flex flex-col px-4 py-2 bg-baseWhite rounded-lg gap-2 cursor-pointer`}
    >
      <Typography
        type='subtitle'
        className={`text-header text-ellipsis break-words truncate max-w-[75ch]`}
      >
        {title}
      </Typography>

      <div className='flex flex-row items-center gap-2'>
        {/* Comments */}
        <Icon name='comment' className='text-grayLight' raw />
        <Typography
          type='button'
          className='text-grayL !text-base !leading-[1.2rem] font-medium tracking-medium'
        >
          {replies?.length}
        </Typography>

        {/* Seperator */}
        <div className='w-[0.3rem] h-[0.3rem] rounded-full bg-grayMedium' />

        {/* Upvotes */}
        <Typography
          type='body'
          className='text-grayL !text-base !leading-[1.6rem]'
        >
          {/* TODO: Need to confirm if the explore should show net votes as well? */}
          {totalVotes} Net Votes
        </Typography>

        {/* Separator */}
        <div className='w-[0.3rem] h-[0.3rem] rounded-full bg-grayMedium' />

        {/* User Display name */}
        <Typography
          type='link'
          className='no-underline text-primary !leading-[1.2rem] !text-base font-medium tracking-medium'
        >
          @
          {userId?.verified
            ? userId?.displayName
            : userId?.userIdHash}
        </Typography>

        {/* Separator */}
        <div className='w-[0.3rem] h-[0.3rem] rounded-full bg-grayLight' />

        {/* Time difference */}
        <Typography
          type='body'
          className='flex items-center text-grayLight text-base !leading-[1.2rem] tracking-medium font-medium'
        >
          {formatDistance(new Date(createdAt), new Date(), {
            addSuffix: true
          })}
        </Typography>
      </div>
    </div>
  )
}

export default PostTicket
