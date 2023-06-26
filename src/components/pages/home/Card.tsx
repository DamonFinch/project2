import React, { useMemo } from 'react'
import { IPost } from 'types/interfaces'
import CardHeader from './CardHeader'
import Link from 'next/link'
import { getCardImage, getCardText } from 'utils'
import CustomImage from 'components/core/Image'
import Typography from 'components/core/Typography'

const Card = ({
  title,
  createdAt,
  text,
  _id,
  preview,
  userId: { verified, displayName, userIdHash, avatar }
}: IPost) => {
  const cardText = useMemo(
    () => getCardText(title, text, preview, _id),
    [title, text, preview, _id]
  )

  const cardImage = useMemo<
    { src: string; isVideo: boolean } | undefined
  >(
    () => getCardImage(cardText, text, preview),
    [preview, text, cardText]
  )

  const cardGap = useMemo<string>(() => {
    let gap: string = ''

    if (cardImage && !cardImage.isVideo && !preview?.image) {
      // i.e. image and preview image from a link
      gap = 'gap-8'
    } else if (cardImage?.isVideo || preview?.image) {
      // i.e. video
      gap = 'gap-[3.125rem]'
    } else {
      // content
      gap = 'gap-4'
    }

    return gap
  }, [cardImage, preview])

  const textColor = useMemo(
    () => (cardImage?.src ? 'text-white' : 'text-primary'),
    [cardImage]
  )

  return (
    <Link
      href={`/post/${_id}`}
      className={`relative flex flex-col no-underline rounded-lg mb-6 overflow-hidden ${
        cardImage?.src
          ? 'bg-primary'
          : 'bg-historic border-stroke border'
      }`}
    >
      {/* Background image/video */}
      {cardImage?.src && (
        <div className='absolute left-0 right-0 bottom-0 top-0 z-0'>
          {cardImage.isVideo && !preview?.youtubeId ? (
            <video autoPlay={false}>
              <source src={cardImage.src} />
            </video>
          ) : (
            <CustomImage
              fill
              sizes='30vw'
              src={cardImage.src}
              alt={cardText.title || ''}
              className='object-cover object-center'
              fallbackClassName='h-full w-full bg-center bg-cover'
            />
          )}

          <div
            className='absolute top-0 left-0 right-0 bottom-0'
            style={{
              background: `linear-gradient(0.73deg, #213642 0.61%, rgba(33, 54, 66, 0) 58.64%)`
            }}
          />
        </div>
      )}

      {/* Content */}
      <div
        className={`z-10 flex ${cardGap} flex-col justify-between p-4`}
      >
        <CardHeader
          date={createdAt}
          title={cardText.title || 'A post'}
          name={verified ? displayName : userIdHash ?? '????'}
          avatar={avatar!}
          isVideo={cardImage?.isVideo}
          hasImage={!!cardImage?.src}
          isURL={
            cardText.isPreviewText &&
            !!preview?.title &&
            !preview?.youtubeId
          }
        />

        <div className='flex flex-col gap-1'>
          {preview?.favicon && cardText.isPreviewText && (
            <div className='flex flex-row items-center gap-1'>
              <CustomImage
                src={preview.favicon}
                alt={`${preview.siteName}'s logo`}
                fallbackClassName='h-5 w-5 bg-center bg-cover bg-baseWhite rounded-[0.25rem]'
                width={20}
                height={20}
                className='rounded-[0.25rem]'
              />

              <Typography
                type='body'
                className='!text-[0.625rem] font-medium tracking-medium text-baseWhite'
              >
                {preview.siteName}
              </Typography>
            </div>
          )}

          <div className='flex flex-col gap-1'>
            {cardText.title && (
              <p
                className={`text-xl break-words line-clamp-4 leading-8 text-ellipsis font-semibold ${textColor}`}
              >
                {cardText.title}
              </p>
            )}

            {cardText.content && (
              <p
                className={`font-normal text-base text-ellipsis leading-[1.6rem] line-clamp-2 ${textColor}`}
              >
                {cardText.content}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card
