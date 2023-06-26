import React, { useCallback } from 'react'
import { IPublicUser } from 'types/interfaces'
import Typography from 'components/core/Typography'
import Icon from 'components/core/Icon'
import Popover from 'components/Popover'
import IntroductoryPost from './introduction'
import Badge from 'assets/badge.svg'
import Image from 'next/image'
import { useAppDispatch } from 'store/hooks'
import { setIsShareModalVisible } from 'store/slices/app.slice'

const ProfilePageHeader = ({
  user: {
    avatar,
    verified,
    userIdHash,
    displayName,
    reputation,
    introductoryPost
  }
}: IPublicUser) => {
  const dispatch = useAppDispatch()

  const onShare = useCallback(() => {
    dispatch(setIsShareModalVisible(true))
  }, [dispatch])

  const onReport = useCallback(() => {
    // TODO: Add report logic
  }, [])

  return (
    <div className='flex flex-row items-end gap-4 w-full'>
      {/* Image */}
      <div className='relative'>
        <Image
          // @ts-ignore
          src={avatar}
          className='aspect-square rounded-full !border-[0.1875rem] border-baseWhite bg-black'
          height={305}
          width={305}
          alt='profile'
        />

        {/* TODO: Need to add the badge */}
        <div className='absolute right-0 bottom-0'>
          <Image src={Badge} alt='Reputation Badge' />
          <div className='absolute left-0 right-0 top-4 flex flex-row justify-center'>
            <Typography
              type='body'
              className='text-primary font-bold !text-[1.6975rem] !leading-[2.37625rem]'
            >
              {reputation}
            </Typography>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-2 w-full items-stretch'>
        {/* Header */}
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-row items-center gap-2'>
            {/* Display Name */}
            <Typography
              type='subtitle'
              className='!text-[2rem] !leading-[2.4rem] font-medium text-header'
            >
              {displayName}
            </Typography>

            {/* Verified Badge */}
            {verified && <Icon name='verified' raw />}

            {/* User name */}
            <Typography
              type='body'
              className='font-normal !text-base !leading-[1.6rem] text-grayMd'
            >
              @{userIdHash}
            </Typography>
          </div>

          {/* Menu to report or share profile */}
          <Popover>
            <Icon
              name='dots'
              size={24}
              className='text-body rounded-lg h-12 w-12 grid place-items-center p-3'
            />

            {() => (
              <div className='flex flex-col rounded-lg bg-baseWhite cursor-pointer overflow-hidden border-stroke mt-6 shadow'>
                {/* Share Profile */}
                <div
                  onClick={onShare}
                  className='flex flex-row items-center border-b border-stroke justify-start gap-2 py-[1.25rem] px-6'
                >
                  <Icon
                    name='share2'
                    size={24}
                    className='text-grayMedium'
                    raw
                  />
                  <Typography
                    type='body'
                    className='!text-base !leading-[1.2rem] tracking-medium font-medium text-grayMedium'
                  >
                    Share Profile
                  </Typography>
                </div>

                {/* Report Profile */}
                <div
                  onClick={onReport}
                  className='hidden flex-row items-center justify-start gap-2 py-[1.25rem] px-6'
                >
                  <Icon name='flag' raw />
                  <Typography
                    type='body'
                    className='!text-base !leading-[1.2rem] tracking-medium font-medium text-grayMedium'
                  >
                    Report Profile
                  </Typography>
                </div>
              </div>
            )}
          </Popover>
        </div>

        {/* Introductory Post */}
        {verified ? (
          introductoryPost && (
            <IntroductoryPost {...introductoryPost} />
          )
        ) : (
          <div className='text-base leading[1.6rem] text-grayMd p-4 rounded-lg bg-baseWhite border-stroke'>
            This person isn&apos;t verified yet.
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePageHeader
