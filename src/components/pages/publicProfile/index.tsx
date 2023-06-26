import React, { useCallback, useState } from 'react'
import Head from 'next/head'
import { useInfiniteQuery } from 'react-query'
import http from 'services/http-common'
import { IPublicUser } from 'types/interfaces'
import ProfilePageHeader from './header'
import Typography from 'components/core/Typography'
import Icon from 'components/core/Icon'
import PublicPosts from './posts'
import Button from 'components/core/Button'

const PublicProfilePage = ({
  user,
  totalPosts,
  totalDownvotes,
  totalUpvotes
}: IPublicUser) => {
  const { _id: userId, verified, userIdHash, displayName } = user

  const limit = 30
  const [viewType, setViewType] = useState<'list' | 'grid'>('list')

  const getUserPosts = async (page: number) => {
    const response = await http.get(
      `/getPublicPosts/${userId}?perPage=${limit}&page=${page}`
    )

    return {
      result: response.data.data
    }
  }

  const response = useInfiniteQuery({
    queryKey: `getPublicPosts/${userId}`,
    queryFn: ({ pageParam = 1 }) => getUserPosts(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage: number = allPages.length + 1
      return lastPage.result.length === limit ? nextPage : undefined
    },
    enabled: false
  })

  const toggleViewType = useCallback(
    () =>
      setViewType(previous =>
        previous === 'list' ? 'grid' : 'list'
      ),
    []
  )

  return (
    <div className='w-full max-w-[100rem] px-2 md:px-28 mb-8 flex flex-col items-stretch'>
      <Head>
        <title>
          {verified ? displayName : userIdHash}&apos;s Profile - Here
          News
        </title>
      </Head>

      <ProfilePageHeader user={user} />

      <div className='flex flex-row py-2 px-4 rounded-lg bg-baseWhite border-stroke mt-4 mb-2 justify-between items-center'>
        {/* Summary */}
        <div className='flex flex-row gap-6 items-center'>
          <Typography
            type='subtitle-small'
            className='!text-xl text-header font-medium'
          >
            {verified ? `@${userIdHash}` : `${displayName}'s`} posts
          </Typography>

          <div className='flex flex-row gap-4 items-stretch py-[0.1875rem] px-2'>
            <Typography
              type='small'
              className='!text-sm !leading-[1.4rem] text-grayMd'
            >
              {totalPosts || 0} Posts
            </Typography>

            <div className='border-l border-solid border-grayMd' />

            <Typography
              type='small'
              className='!text-sm !leading-[1.4rem] text-grayMd'
            >
              {totalUpvotes || 0} Upvotes
            </Typography>

            <div className='border-l border-solid border-grayMd' />

            <Typography
              type='small'
              className='!text-sm !leading-[1.4rem] text-grayMd'
            >
              {totalDownvotes || 0} Downvotes
            </Typography>
          </div>
        </div>

        {/* View type */}
        <div className='flex flex-row gap-2'>
          <Button
            className={`grid place-items-center rounded-lg !border-none transition-colors !p-3 ${
              viewType === 'list' ? '!bg-pearl' : '!bg-historic'
            }`}
            onClick={toggleViewType}
          >
            <Icon
              name='listView'
              color={viewType === 'list' ? '#53389E' : '#ADB3BD'}
              raw
            />
          </Button>

          <Button
            className={`grid place-items-center rounded-lg !border-none !p-3 transition-colors ${
              viewType === 'grid' ? '!bg-pearl' : '!bg-historic'
            }`}
            onClick={toggleViewType}
          >
            <Icon
              name='gridView'
              color={viewType === 'grid' ? '#53389E' : '#ADB3BD'}
              raw
            />
          </Button>
        </div>
      </div>

      <PublicPosts type={viewType} response={response} />
    </div>
  )
}

export default PublicProfilePage
