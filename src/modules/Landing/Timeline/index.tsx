import React from 'react'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'

import TimelineRoadmap from 'assets/landing/timeline.webp'

import styles from './Timeline.module.css'
import Typography from 'components/core/Typography'

function Timeline() {
  const { t } = useTranslation('landing')

  return (
    <div
      id='timeline'
      className='gap-y-8 md:gap-x-4 mt-8 md:mt-0 h-[300px] md:h-[350px] lg:h-[596px] px-[1.25rem] lg:px-[7rem] flex flex-col md:flex-row centerAll'
    >
      <div className='col md:flex-row md:items-center justify-between max-w-[1278px] flex-1 md:gap-x-3 gap-x-6'>
        <div className='col centerAll'>
          <Typography
            type='subtitle'
            className={`mt-1 md:mt-2 font-light !leading-[120%] text-center ${styles.main_title} max-w-[400px]`}
          >
            {t('TIMELINE_HEADER')}
          </Typography>
        </div>
        <div className='relative flex-1 w-[85vw] md:w-full h-[21.875rem] lg:h-[30rem] flex justify-center lg:justify-end items-center'>
          <Image
            src={TimelineRoadmap}
            alt='Here.news roadmap'
            fill
            className='object-contain'
          />
        </div>
      </div>
    </div>
  )
}

export default Timeline
