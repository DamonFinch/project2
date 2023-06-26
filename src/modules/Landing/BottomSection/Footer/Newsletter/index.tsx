import React from 'react'
import useTranslation from 'next-translate/useTranslation'

import NewsletterInput from './NewsletterInput'
import styles from './Newsletter.module.css'

function Newsletter() {
  const { t } = useTranslation('landing')
  return (
    <div
      className={`relative mt-[7.75rem] p-[0.125rem] w-full row centerAll rounded-3xl before:rounded-3xl before:p-[2px] ${styles.content_container}`}
      id='newsletter'
    >
      <div
        className={`flex-1 w-full h-full rounded-3xl col items-center ${styles.inner_container}`}
      >
        <div className='py-16 lg:px-[1.25rem] xl:px-[2.5rem] 2xl:px-[5.75rem] w-full h-full rounded-3xl col centerAll gap-y-3 lg:flex-row lg:justify-between lg:items-center lg:gap-x-3 z-[1]'>
          <h1
            className={`text-lg h-autolg:text-xl xl:text-[2rem] 2xl:leading-[2.375rem] font-display font-light ${styles.subscribe_text}`}
          >
            {t('NEWSLETTER_TEXT')}
          </h1>

          <NewsletterInput />
        </div>
      </div>
    </div>
  )
}

export default Newsletter
