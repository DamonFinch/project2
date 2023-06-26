import React from 'react'

import Media from 'components/core/Media'
import Newsletter from './Newsletter'
import Socials from './Socials'
import SecondaryFooter from './SecondaryFooter'

import WhiteBG from 'assets/landing/white.webp'
function Footer() {
  return (
    <div className='relative overflow-hidden px-[1.25rem] lg:px-[10.9375rem] h-[781px] col items-center'>
      <div className='absolute w-[450vw] md:w-[160vw] lg:w-[120vw] min-h-[63.9375rem] top-[7.8125rem] -left-[10.9375rem]'>
        <Media
          type='video'
          className='h-full min-w-full max-w-full object-cover blur-[0.75rem]'
          link={require('assets/landing/main_video.mp4')}
          videoProps={{
            autoPlay: true,
            muted: true,
            loop: true,
            poster: WhiteBG.src
          }}
        />
      </div>
      <div className='z-[1] w-full'>
        <Newsletter />
        <Socials />
        <SecondaryFooter />
      </div>
    </div>
  )
}

export default Footer
