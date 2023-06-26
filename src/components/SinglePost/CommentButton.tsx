import Avatar from 'components/Avatar'
import Typography from 'components/core/Typography'
import React, { useMemo } from 'react'
import { IUser } from 'types/interfaces'

interface Props {
  commentors: IUser[]
  totalComments?: number
}

const CommentButton = ({ commentors, totalComments = 0 }: Props) => {
  const largeAvatarBoxWidth = useMemo(
    () =>
      commentors.length > 0
        ? (commentors.length +
            (totalComments > commentors.length ? 1 : 0)) *
            1.875 +
          1
        : 0,
    [commentors, totalComments]
  )

  const smallAvatarBoxWidth = useMemo(
    () =>
      commentors.length > 0
        ? (commentors.length +
            (totalComments > commentors.length ? 1 : 0)) *
            1.125 +
          0.5
        : 0,
    [commentors, totalComments]
  )

  return (
    <div className='relative h-[1.875rem] sm:h-12 flex flex-row items-center px-2 rounded-lg bg-baseWhite border border-stroke gap-2'>
      {/* Avatar group for large screens */}
      <div
        className='flex-row hidden sm:flex'
        style={{
          width: `${largeAvatarBoxWidth}rem`
        }}
      >
        {commentors.map((item, index) => (
          <div
            className='absolute top-0 my-[0.1875rem]'
            style={{
              left: `${index * 1.875 + 0.5}rem`,
              zIndex: 5 - index
            }}
            key={item._id}
          >
            <Avatar
              // @ts-ignore
              imageUrl={item.avatar}
              iamgeClassNames='!p-0 object-cover rounded-full object-center'
              containerClassNames='w-10 h-10 rounded-full'
            />
          </div>
        ))}

        {totalComments - commentors.length > 0 && (
          <div
            className='absolute w-10 h-10 rounded-full bg-grayDark grid place-items-center text-[0.625rem] text-baseWhite font-medium top-0 my-[0.1875rem]'
            style={{
              left: `${commentors.length * 1.875 + 0.3125}rem`
            }}
          >
            +{totalComments - commentors.length}
          </div>
        )}
      </div>

      <Typography
        type='body'
        className='hidden sm:block !text-xs !leading-[1.2rem] text-grayMedium'
      >
        Comments ({totalComments})
      </Typography>

      {/* Avatar group for small screens */}
      <div
        className='flex-row flex sm:hidden'
        style={{
          width: `${smallAvatarBoxWidth}rem`
        }}
      >
        {commentors.map((item, index) => (
          <div
            className='absolute top-0 my-[0.1875rem]'
            style={{
              left: `${index * 1.125 + 0.5}rem`,
              zIndex: 5 - index
            }}
            key={item._id}
          >
            <Avatar
              // @ts-ignore
              imageUrl={item.avatar}
              iamgeClassNames='!p-0 object-cover rounded-full object-center'
              containerClassNames='w-6 h-6 rounded-full'
            />
          </div>
        ))}

        {totalComments - commentors.length > 0 && (
          <div
            className='w-6 h-6 rounded-full bg-grayDark grid place-items-center text-[0.625rem] text-baseWhite font-medium absolute top-0 my-[0.1875rem]'
            style={{
              left: `${commentors.length * 1.125 + 0.5}rem`
            }}
          >
            +{totalComments - commentors.length}
          </div>
        )}
      </div>

      <Typography
        type='body'
        className='block sm:hidden !text-xs !leading-[1.2rem] text-grayMedium'
      >
        ({totalComments})
      </Typography>
    </div>
  )
}

export default CommentButton
