import React from 'react'
import Image from 'next/image'

import ExperienceBG from 'assets/landing/experience-bg.webp'
import Typography from 'components/core/Typography'
import useTranslation from 'next-translate/useTranslation'

function Experience() {
  const { t } = useTranslation('landing')
  return (
    <div className='relative h-[260px] lg:h-[260px] flex centerAll'>
      <div
        className='w-full h-[9.3125rem] absolute top-0 left-0'
        style={{
          background:
            'linear-gradient(0deg, rgba(255,255,255,0) 10% rgba(0,255,255,0.1) 20%, rgba(255,255,255,0), 90%, rgba(255,255,255,1) 100%), linear-gradient(208.02deg, rgba(249, 250, 251, 0.94) 34.4%, rgba(249, 250, 251, 0) 66.26%, rgba(249, 250, 251, 0.6486) 66.26%)'
        }}
      />
      <div className='absolute top-0 left-0 w-full h-full flex centerAll mix-blend-luminosity'>
        <div className='relative w-[27.4375rem] h-[27.4375rem] z-[1]'>
          <Image
            src={ExperienceBG}
            fill
            alt='timeline bg'
            className='object-cover'
            sizes='27.4375rem'
          />
        </div>
      </div>

      <Typography
        type='h3'
        className='mx-[1.25rem] md:mx-0 max-w-[427px] font-display font-light md:leading-[3.6rem] lg:tracking-[-0.02rem] text-center text-landing-black_5'
      >
        {t('EXPERIENCE_HEADER')}
      </Typography>
    </div>
  )
}

export default Experience
