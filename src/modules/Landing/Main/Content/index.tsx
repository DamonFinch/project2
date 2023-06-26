import React, { useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import useTranslation from 'next-translate/useTranslation'

import Typography from 'components/core/Typography'
import WhatsNewButton from './WhatsNewButton'
import VideoModal from 'modules/Landing/Main/Content/VideoModal'

import styles from './Content.module.css'

function Content() {
  const { t } = useTranslation('landing')
  const [isVideoVisible, setIsVideoVisible] = useState(false)

  const toggleVideoVisible = () => setIsVideoVisible(prev => !prev)

  const goToTimeline = () => {
    const item = document.querySelector('#timeline')
    if (!item) return

    item.scrollIntoView({
      behavior: 'smooth'
    })
  }

  return (
    <React.Fragment>
      <div
        className={`relative  max-w-[45.8125rem] w-full h-[535px] md:h-[450px] lg:h-[34.5625rem] p-[0.125rem] row centerAll rounded-3xl z-[1] before:rounded-3xl before:p-[2px] ${styles.content_container}`}
      >
        <div
          className={`relative overflow-hidden flex-1 h-full rounded-3xl col items-center ${styles.inner_container}`}
        >
          <div className='flex-1 h-full rounded-3xl col items-center z-[1]'>
            <div
              className='cursor-pointer row items-center justify-between pl-1 pr-3 gap-x-2 lg:gap-x-4 mt-12 mx-4 md:mx-0  py-1 font-medium text-landing-gray_1 rounded-3xl border-[0.0625rem] border-[rgba(49,65,84,0.13)] bg-[rgba(255,255,255,0.36)]'
              onClick={goToTimeline}
            >
              <p className='font-display text-[0.5rem] md:text-xs lg:text-sm ml-[0.8125rem]'>
                {t('RELEASE_NUMBER')}
              </p>
              <FiArrowRight className='text-sm md:text-lg mr-[0.3125rem]' />
            </div>

            <Typography
              type='h2'
              className={`my-6 w-[85%] lg:w-[37.5625rem] font-display font-medium text-center ${styles.heading}`}
            >
              {t('MAIN_HEADING')}
            </Typography>

            <Typography
              type='subtitle-small'
              className={`text-sm mt-2 font-medium ${styles.inner_subtitle}`}
            >
              {t('MAIN_SUBHEADING')}
            </Typography>
            <Typography
              type='subtitle-small'
              className='text-sm mt-6 text-landing-gray_2 w-[100%] max-w-[39.8125rem] text-center'
            >
              {t('MAIN_DESCRIPTION')}
              {t('MAIN_DESCRIPTION_2')}
            </Typography>

            <div className='relative mt-[52px]'>
              <WhatsNewButton onClick={toggleVideoVisible} />
            </div>
          </div>
        </div>
      </div>
      <VideoModal
        isVisible={isVideoVisible}
        toggleVisible={toggleVideoVisible}
      />
    </React.Fragment>
  )
}

export default Content
