import React, { useCallback, useEffect, useRef } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import { useInfiniteQuery } from 'react-query'
import http from 'services/http-common'
import { useAppSelector } from 'store/hooks'
import { IPost } from 'types/interfaces'
import PostTicket from '../explore/PostTicket'

function Explore() {
  const limit = 30

  const observerElem = useRef(null)
  const selectedAccount = useAppSelector(
    state => state.auth.selectedAccount
  )

  const fetchExplorePosts = async (page: number) => {
    const response = await http.get(
      `/getExplorePosts?per_page=${limit}&page=${page}`
    )
    return {
      result: response.data.data
    }
  }

  const {
    data,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery(
    'getExplorePosts',
    ({ pageParam = 1 }) => fetchExplorePosts(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage: number = allPages.length + 1
        return lastPage.result.length === limit ? nextPage : undefined
      },
      enabled: false
    }
  )

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage]
  )

  useEffect(() => {
    if (!observerElem.current) return
    const element: HTMLDivElement = observerElem.current
    const option = { threshold: 0 }

    const observer = new IntersectionObserver(handleObserver, option)
    observer.observe(element)
    return () => observer.unobserve(element)
  }, [fetchNextPage, hasNextPage, handleObserver])

  return (
    <div
      className={`flex flex-col gap-2 w-full max-w-[100rem] m-auto px-2 md:px-28 ${
        selectedAccount ? 'mt-2' : ''
      }`}
    >
      {isSuccess &&
        data &&
        data.pages &&
        data.pages.map(
          page =>
            page &&
            page.result &&
            page.result.map((post: IPost) => {
              return <PostTicket key={post._id} {...post} />
            })
        )}
      {hasNextPage && (
        <div className='my-4 w-full z-[1] loader' ref={observerElem}>
          <div className='flex items-center justify-center z-[1]'>
            <p className='text-white text-sm bg-black px-3 py-2 rounded-lg font-semibold flex flex-row items-center'>
              {!isFetchingNextPage ? (
                'Load more news...'
              ) : (
                <div className='flex flex-row items-center'>
                  <span className='animate-spin rotate mr-2'>
                    <BiLoaderAlt color='white' />
                  </span>
                  Loading news...
                </div>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Explore
