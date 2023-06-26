import Layout from 'components/Layouts'
import Trending from 'components/pages/home/Trending'
import { GetServerSideProps } from 'next'
import React from 'react'
import { QueryClient, dehydrate } from 'react-query'
import http from 'services/http-common'

function Home() {
  return (
    <Layout pageTitle='POC - Here News' type='home'>
      <Trending />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<{}> =
  async () => {
    const queryClient = new QueryClient()
    const limit = 30

    const fetchTrendingPosts = async (page: number) => {
      const response = await http.get(
        `/getTrendingPosts?per_page=${limit}&page=${page}`
      )
      return {
        result: response.data.data
      }
    }

    await queryClient.prefetchInfiniteQuery({
      queryKey: 'getTrendingPosts',
      queryFn: ({ pageParam = 1 }) => fetchTrendingPosts(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage: number = allPages.length + 1
        return lastPage.result.length === limit ? nextPage : undefined
      }
    })

    return {
      props: {
        dehydratedState: JSON.parse(
          JSON.stringify(dehydrate(queryClient))
        )
      }
    }
  }

export default Home
