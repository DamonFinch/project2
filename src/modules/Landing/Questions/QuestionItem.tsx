import React from 'react'

import Typography from 'components/core/Typography'

import styles from './QuestionItem.module.css'
import QuestionBackground from 'assets/landing/questions-background.webp'

interface IQuestionItem {
  text: string
  className?: string
}

function QuestionItem({ text, className }: IQuestionItem) {
  return (
    <div
      className={`flex centerAll py-4 px-6 rounded-[72px] before:rounded-[72px] before:p-[2px] ${styles.item__container} ${className}`}
      style={{
        background: `url(${QuestionBackground.src})`
      }}
    >
      <Typography
        type='none'
        className={`text-[10px] md:text-[15px] lg:text-xl xl:text-2xl ${styles.item__containerText} font-light text-center`}
      >
        {text}
      </Typography>
    </div>
  )
}

export default QuestionItem
