import React from 'react'
import { FiChevronRight } from 'react-icons/fi'
import Image from 'next/image'

import QuestionItem from './QuestionItem'

import Question from 'assets/landing/question.webp'
import QuestionTwo from 'assets/landing/question-2.webp'
import Typography from 'components/core/Typography'
import useTranslation from 'next-translate/useTranslation'

function Questions() {
  const { t } = useTranslation('landing')
  const goToNewsletter = () => {
    const item = document.querySelector('#newsletter')
    if (!item) return

    item.scrollIntoView({
      behavior: 'smooth'
    })
  }

  return (
    <div className='col centerAll h-[480px] md:h-[620px] lg:h-[887px] lg:px-0'>
      <div className='relative max-w-[260px] sm:max-w-[350px] md:max-w-[635px] lg:max-w-[826px] xl:max-w-[950px] w-full py-2 flex flex-col items-center bg-red'>
        <div className='absolute lg:-top-[140px] lg:-right-[74px] md:-top-[62px] md:-right-[36px] -top-[22px] -right-[28px] z-[1] lg:w-[144px] lg:h-[256px] md:w-[100px] md:h-[175px] w-[60px] h-[108px]'>
          <Image
            src={Question}
            alt='question'
            fill
            className='object-contain'
          />
        </div>
        <div className='absolute lg:bottom-[75px] lg:left-[-43px] md:bottom-[113px] md:left-[-14px] bottom-[124px] left-[-23px] z-[1] lg:w-[108px] lg:h-[191px] md:w-[75px] md:h-[105px] w-[46px] h-[64px]'>
          <Image
            src={QuestionTwo}
            alt='question two'
            fill
            className='object-contain'
          />
        </div>
        <QuestionItem text={t('QUESTIONS_FIRST')} />
        <QuestionItem
          text={t('QUESTIONS_SECOND')}
          className='mt-3 md:mt-6'
        />
        <QuestionItem
          text={t('QUESTIONS_THIRD')}
          className='mt-3 md:mt-6'
        />
        <QuestionItem
          text={t('QUESTIONS_FOURTH')}
          className='mt-6 md:mt-12 rotate-[-4.74deg]'
        />
      </div>

      <button
        onClick={goToNewsletter}
        className='row items-center py-[0.5rem] md:py-[0.7813rem] px-2 md:px-4 border-2 border-landing-black rounded-3xl mt-6 md:mt-[76px] text-landing-black hover:text-white hover:bg-landing-black transition-colors'
      >
        <Typography
          type='button'
          className='font-display font-medium'
        >
          {t('JOIN_WAITLIST')}
        </Typography>
        <FiChevronRight className='h-[1rem] w-[1rem] md:h-[1.25rem] md:w-[1.25rem] ml-1' />
      </button>
    </div>
  )
}

export default Questions
