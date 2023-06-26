import Avatar from 'components/Avatar'
import Loader from 'components/Loader'
import CustomImage from 'components/core/Image'
import Typography from 'components/core/Typography'
import formatDistance from 'date-fns/formatDistance'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { ILinkDetails, IPost } from 'types/interfaces'

interface Props {
  isLoading: boolean
  linKPreviewError: unknown
  preview?: ILinkDetails
  showSourceInfo: boolean
}

function EditorLinkPreview({
  isLoading,
  preview,
  linKPreviewError,
  showSourceInfo
}: Props) {
  if (isLoading) {
    return (
      <div className='rounded-lg px-4 py-2 bg-historic border-stroke flex flex-row gap-2'>
        <Loader />
      </div>
    )
  }

  if (linKPreviewError && typeof linKPreviewError === 'string') {
    return (
      <div className='rounded-lg px-4 py-2 bg-historic border-stroke flex flex-row gap-2 !text-sm !leading-[1.2rem] text-red-500'>
        {linKPreviewError}
      </div>
    )
  }

  return preview && preview.title ? (
    <Link
      href={
        preview.sourcePost
          ? `/post/${preview.sourcePost._id}`
          : preview.url
      }
      target='_blank'
      className='no-underline rounded-lg px-4 py-2 bg-historic border-stroke flex flex-col items-stretch gap-2'
    >
      {/* Source post info */}
      {preview.sourcePost && showSourceInfo && (
        <SourcePostInfo {...preview.sourcePost} />
      )}

      <div
        className={`flex flex-row gap-2 ${
          preview.sourcePost
            ? 'bg-baseWhite p-2 rounded-lg'
            : 'bg-transparent'
        }`}
      >
        {/* Preview Image */}
        {preview.image && (
          <CustomImage
            width={150}
            height={150}
            className='w-[7.75rem] h-[8.5rem] rounded-lg object-cover object-center shrink-0'
            fallbackClassName='w-[7.75rem] h-[8.5rem] rounded-lg bg-cover bg-center shrink-0'
            src={preview.image}
            alt={preview.title}
          />
        )}

        {/* Preview content */}
        <div className='flex flex-col gap-2 flex-1'>
          <div className='flex flex-row gap-1 items-center'>
            {/* Favicon */}
            {preview.favicon && (
              <div
                className='w-5 h-5 rounded-full bg-contain bg-center bg-no-repeat'
                style={{
                  backgroundImage: `url("${preview.favicon}")`
                }}
              />
            )}

            {/* Preview website */}
            <Typography
              type='body'
              className='!text-xs !leading-[1.05rem] tracking-medium text-linkBody'
            >
              {new URL(preview.url).host}
            </Typography>
          </div>

          {/* Preview title */}
          <Typography
            type='subtitle-small'
            className='!text-xl text-header !leading-7 !font-medium'
          >
            {preview.title}
          </Typography>

          {/* Preview description */}
          <Typography
            type='small'
            className='!text-sm !leading-[1.4rem] text-linkBody text-justify line-clamp-2'
          >
            {preview.description}
          </Typography>
        </div>
      </div>
    </Link>
  ) : (
    <></>
  )
}

const SourcePostInfo = ({
  userId: { _id, avatar, userIdHash, displayName, verified },
  createdAt
}: IPost) => {
  const time = useMemo(
    () =>
      formatDistance(new Date(createdAt), new Date(), {
        addSuffix: true
      }),
    [createdAt]
  )

  return (
    <div className='flex flex-row items-center gap-2'>
      <Avatar
        imageUrl={avatar}
        iamgeClassNames='object-cover object-center'
        containerClassNames='w-12 h-12 rounded-full'
      />
      <Typography
        type='body'
        className='font-medium !text-xl !leading-6 tracking-medium text-header'
      >
        @{verified ? displayName : userIdHash}
      </Typography>
      <div className='w-1.5 h-1.5 bg-header rounded-full' />
      <Typography
        type='body'
        className='tracking-medium !text-base !leading-[1.4rem] text-header underline'
      >
        {time}
      </Typography>
    </div>
  )
}

export default EditorLinkPreview
