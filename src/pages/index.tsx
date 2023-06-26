import React from 'react'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

const Main = dynamic(() => import('modules/Landing/Main'))
const Facts = dynamic(() => import('modules/Landing/Facts'))
const Questions = dynamic(() => import('modules/Landing/Questions'))
const Consensus = dynamic(() => import('modules/Landing/Consensus'))
const Team = dynamic(() => import('modules/Landing/Team'))
const Timeline = dynamic(() => import('modules/Landing/Timeline'))
const BottomSection = dynamic(
  () => import('modules/Landing/BottomSection')
)

function Landing() {
  return (
    <div className='bg-here-gray-50'>
      <Head>
        <title>Here.news - A new era of news platform</title>
      </Head>

      <Main />
      <Questions />
      <Facts />
      <Team />
      <Consensus />
      <Timeline />
      <BottomSection />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  resolvedUrl
}) => {
  const metaTags = {
    'og:title': 'Here.news - A new era of news platform',
    'og:description':
      'Here.news is a user-driven news platform where users share, vote and discuss news stories and earn from contributions. Join us and be part of a democratic news ecosystem.!',
    'og:image':
      'https://storage.googleapis.com/artifacts.phonic-jetty-356702.appspot.com/static/meta-thumbnail.png',
    'og:url': `${req.headers.host}${resolvedUrl}`
  }

  return {
    props: {
      metaTags
    }
  }
}

export default Landing
