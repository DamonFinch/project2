import React, { useMemo } from 'react'

import Media from 'components/core/Media'
import Bubble from './Bubble'
import { getTopRows, getBottomRows } from './data'

import BG from 'assets/landing/cloud-bg.webp'
import WhiteBG from 'assets/landing/white.webp'
import useTranslation from 'next-translate/useTranslation'

function Team() {
  const { t } = useTranslation('landing')

  const teamTopRow = useMemo(() => getTopRows(t), [t])
  const teamBottomRow = useMemo(() => getBottomRows(t), [t])

  return (
    <div className='row justify-center pt-4 md:pt-16 bg-white'>
      <div className='relative flex w-screen h-[21.875rem] md:h-[46.875rem]'>
        <div
          className='w-full h-[5rem] absolute top-0 left-0 z-[1]'
          style={{
            background:
              'linear-gradient(180deg, #fff 0%, rgba(0, 0, 0, 0) 100%)'
          }}
        />
        <Media
          type='video'
          className='absolute bottom-0 left-0 h-full min-w-full max-w-full object-cover'
          link={require('assets/landing/globe.mp4')}
          videoProps={{
            autoPlay: true,
            muted: true,
            loop: true,
            controls: false,
            poster: WhiteBG.src,
            playsInline: true
          }}
          containerClasses='w-auto'
        />
        <div
          className='absolute bottom-0 left-0 w-full h-full'
          style={{
            background: 'linear-gradient(0deg, #D0E3ED, #D0E3ED)',
            mixBlendMode: 'lighten'
          }}
        />
        <div
          className='absolute bottom-0 left-0 w-full h-full opacity-5'
          style={{
            background: 'linear-gradient(0deg, #fff, #fff)',
            mixBlendMode: 'lighten'
          }}
        />

        <div
          className='absolute bottom-0 left-0 w-full h-full '
          style={{
            backgroundImage: `url(${BG.src})`,
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        />

        <div className='relative w-full mt-4 md:mt-[9rem]'>
          <div className='row justify-between mx-[1.25rem] lg:mx-[7rem] w-[92%] md:w-[72%]'>
            {teamTopRow.map((member, i) => (
              <Bubble
                key={i}
                MemberImage={member.Image}
                name={member.name}
                designation={member.designation}
                designationTwo={member.designationTwo}
              />
            ))}
          </div>
          <div className='mt-6 row justify-between items-end mx-[1.25rem] lg:mx-[7rem] pl-0 lg:pl-[6.5rem] xl:pl-[2.875rem] ml-[1%] md:ml-[19%]'>
            {teamBottomRow.map((member, i) => (
              <Bubble
                key={i}
                MemberImage={member.Image}
                name={member.name}
                designation={member.designation}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Team
