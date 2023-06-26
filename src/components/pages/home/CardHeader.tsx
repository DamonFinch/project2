import React, { useMemo } from 'react'
import Image from 'next/image'
import PlayIcon from 'assets/play.png'
import formatDistance from 'date-fns/formatDistance'
import Avatar from 'components/Avatar'
import Typography from 'components/core/Typography'

interface Props {
  date: Date
  title: string
  name: string
  avatar?: string
  isVideo?: boolean
  isURL?: boolean
  hasImage?: boolean
}

const CardHeader = ({
  date,
  title,
  name,
  avatar,
  isVideo,
  isURL,
  hasImage
}: Props) => {
  const time = useMemo(
    () =>
      formatDistance(new Date(date), new Date(), {
        addSuffix: true
      }),
    [date]
  )

  return (
    <div className='flex flex-row justify-between items-center'>
      {isURL ? (
        // Time text
        <div className='flex flex-row gap-1 items-center'>
          <div className='w-1 h-1 rounded-lg bg-baseWhite' />
          <p className='text-xs !leading-[0.8rem] font-medium text-baseWhite'>
            {time}
          </p>
        </div>
      ) : (
        <div className='flex flex-row gap-2 items-center'>
          <Avatar
            imageUrl={avatar}
            iamgeClassNames='w-full h-full !object-cover !p-0'
            containerClassNames='w-10 h-10 rounded-full'
          />

          <div className='flex flex-col'>
            <Typography
              type='subtitle-small'
              className={`!text-base !leading-[1.4rem] !font-medium tracking-medium ${
                !hasImage ? 'text-primary' : 'text-baseWhite'
              }`}
            >
              {name}
            </Typography>

            <div className='flex flex-row gap-1 items-center'>
              <div
                className={`w-1 h-1 rounded-lg ${
                  !hasImage ? 'bg-primary' : 'bg-baseWhite'
                }`}
              />
              <p
                className={`text-[0.625rem] !leading-[0.8rem] font-medium ${
                  !hasImage ? 'text-primary' : 'text-baseWhite'
                }`}
              >
                {time}
              </p>
            </div>
          </div>
        </div>
      )}

      {isVideo && (
        <div className='w-8 grid place-items-center aspect-square rounded-full border-2 border-white'>
          <Image
            width={7.1}
            height={9.13}
            className='object-contain ml-[0.125rem]'
            src={PlayIcon}
            alt={`Play the video: ${title}`}
          />
        </div>
      )}
    </div>
  )
}

export default CardHeader
