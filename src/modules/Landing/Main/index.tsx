import React from 'react'

import Media from 'components/core/Media'
import Content from './Content'
import Header from './Header'

import WhiteBG from 'assets/landing/white.webp'

function Main() {
  return (
    <div className='relative w-full 2xl:h-[835px]'>
      <Media
        type='video'
        className='bg-here-gray-50 absolute top-0 left-0 h-full min-w-full max-w-full object-cover blur-[0.75rem] z-[0]'
        link={require('assets/landing/main_video.mp4')}
        videoProps={{
          controls: false,
          autoPlay: true,
          muted: true,
          loop: true,
          playsInline: true,
          poster: WhiteBG.src
        }}
        containerClasses='w-full bg-white'
      />
      <Header />
      <div className='row justify-center mt-[4.5rem] pb-[5rem] z-[1] mx-4 lg:mx-0'>
        <Content />
      </div>
      <div
        className='w-full h-[3.1875rem] absolute bottom-0 left-0 z-[1]'
        style={{
          background:
            'linear-gradient(180deg,rgba(249, 250, 251, 0) 0%, #F9FAFB 100%)'
        }}
      />
    </div>
  )
}

export default Main
