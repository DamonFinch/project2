import React from 'react'
import useTranslation from 'next-translate/useTranslation'

import SlideOne from 'assets/landing/slide-1.webp'
import SlideTwo from 'assets/landing/slide-2.webp'
import SlideThree from 'assets/landing/slide-3.webp'
import SlideFour from 'assets/landing/slide-4.webp'

import Typography from 'components/core/Typography'
import Indicators from './Indicators'

import styles from './Facts.module.css'

export const leftItems = [
  {
    Item: () => {
      const { t } = useTranslation('landing')
      return (
        <div>
          <Typography
            type='subtitle'
            className={`font-display mt-1 md:mt-2 font-light !leading-[120%] ${styles.main_title}`}
          >
            {t('FACTS_FIRST_HEADER')}
          </Typography>
          <Typography
            type='body'
            className='font-display mt-1 md:mt-2 lg:mt-4 leading-[140%] max-w-[29rem] text-landing-gray_6'
          >
            {t('FACTS_FIRST_DESCRIPTION')}
          </Typography>
          <div className='mt-[1.2675rem] row gap-4'>
            <Indicators selected={0} />
          </div>
        </div>
      )
    }
  },
  {
    Item: () => (
      <div
        className='relative w-[90vw] h-[18.75rem] md:w-[20.625rem] md:h-[26.25rem] xl:w-[43.125rem] xl:h-[28.4375rem]'
        style={{
          backgroundImage: `url(${SlideTwo.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          boxShadow: '0 0 1rem 1rem white inset'
        }}
      />
    )
  },
  {
    Item: () => {
      const { t } = useTranslation('landing')

      return (
        <div>
          <Typography
            type='subtitle'
            className={`font-display mt-1 md:mt-2 font-light !leading-[120%] ${styles.main_title}`}
          >
            {t('FACTS_THIRD_HEADER')}
          </Typography>
          <Typography
            type='body'
            className='font-display mt-1 md:mt-2 lg:mt-4 leading-[140%] max-w-[29rem] text-landing-gray_6'
          >
            {t('FACTS_THIRD_DESCRIPTION')}
          </Typography>

          <div className='mt-[1.2675rem] row gap-4'>
            <Indicators selected={2} />
          </div>
        </div>
      )
    }
  },
  {
    Item: () => (
      <div
        className='relative w-[90vw] h-[18.75rem] md:w-[18.75rem] md:h-[18.75rem] lg:w-[25rem] lg:h-[24.875rem] xl:w-[43.125rem] xl:h-[28.4375rem]'
        style={{
          backgroundImage: `url(${SlideFour.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          boxShadow: '0 0 1rem 1rem white inset'
        }}
      />
    )
  }
]

export const rightItems = [
  {
    Item: () => (
      <div className='relative overflow-hidden md:flex-1 h-[30rem] flex justify-end items-center'>
        <div
          className='relative w-[90vw] h-[12.5rem] md:w-[23.75rem] md:h-[21rem] lg:w-[28.75rem] lg:h-[26.75rem] xl:w-[43.125rem] xl:h-[28.4375rem] md:mt-[2.875rem] mr-0'
          style={{
            backgroundImage: `url(${SlideOne.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            boxShadow: '0 0 1rem 1rem white inset'
          }}
        />
      </div>
    )
  },
  {
    Item: () => {
      const { t } = useTranslation('landing')
      return (
        <div className='mx-3 md:mx-0 xl:mr-9'>
          <Typography
            type='subtitle'
            className={`font-display mt-1 md:mt-2 font-light !leading-[120%] ${styles.main_title}`}
          >
            {t('FACTS_SECOND_HEADER')}
          </Typography>
          <Typography
            type='body'
            className='font-display mt-1 md:mt-2 lg:mt-4 leading-[140%] max-w-[29rem] text-landing-gray_6'
          >
            {t('FACTS_SECOND_DESCRIPTION')}
          </Typography>

          <div className='mt-[1.2675rem] row gap-4'>
            <Indicators selected={1} />
          </div>
        </div>
      )
    },
    notImage: true
  },
  {
    Item: () => (
      <div className='relative overflow-hidden flex-1 h-[30rem] flex justify-end items-center'>
        <div
          className='relative w-[95vw] h-[12.5rem] md:w-[25rem] md:h-[23.75rem] xl:w-[43.125rem] xl:h-[28.4375rem] xl:mr-[1.5rem] no-repeat'
          style={{
            backgroundImage: `url(${SlideThree.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            boxShadow: '0 0 1rem 1rem white inset'
          }}
        ></div>
      </div>
    )
  },
  {
    Item: () => {
      const { t } = useTranslation('landing')
      return (
        <div className='mx-3 md:mx-0 xl:mr-9'>
          <Typography
            type='subtitle'
            className={`font-display mt-1 md:mt-2 font-light !leading-[120%] ${styles.main_title}`}
          >
            {t('FACTS_FOURTH_HEADER')}
          </Typography>
          <Typography
            type='body'
            className='font-display mt-1 md:mt-2 lg:mt-4 leading-[140%] max-w-[29rem] text-landing-gray_6'
          >
            {t('FACTS_FOURTH_DESCRIPTION')}
          </Typography>

          <div className='mt-[1.2675rem] row gap-4'>
            <Indicators selected={3} />
          </div>
        </div>
      )
    },
    notImage: true
  }
]
