import React from 'react'
import Image from 'next/image'

import ConsensusImage from 'assets/landing/consensus.webp'
import Abstract from 'assets/landing/abstract.svg'
import Typography from 'components/core/Typography'
import useTranslation from 'next-translate/useTranslation'

function Consensus() {
  const { t } = useTranslation('landing')

  return (
    <div className='relative  col items-center py-[2.5rem] md:py-[5rem] px-[1.25rem] lg:px-0'>
      <Typography
        type='h3'
        className='text-xl md:text-2xl lg:text-4xl xl:text-5xl mb-6 md:mb-0 max-w-[375px] w-full col font-display text-landing-black_3 font-light lg:leading-[3.75rem] tracking-[-0.05rem] text-center'
      >
        <span>{t('CONSENSUS_HEADER')}</span>
      </Typography>

      <div className='relative w-full h-[25vh] md:h-[51vh] xl:h-[439px] max-w-[80vw] xl:max-w-[998px] mt-0 md:mt-16 rounded-3xl overflow-hidden z-10'>
        <Image
          src={ConsensusImage}
          fill
          alt='consensus create post'
          className='object-contain'
        />
      </div>

      <Typography
        type='subtitle-2'
        className='text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-[24px] xl:leading-10 tracking-[-0.02em] mt-6 md:mt-16 max-w-[53.1875rem] w-full font-display text-center text-landing-gray_5'
      >
        {t('CONSENSUS_DESCRIPTION')}
      </Typography>
      <Image
        src={Abstract}
        fill
        alt='abstract'
        className='absolute top-0 w-full h-auto'
      />
    </div>
  )
}

export default Consensus
