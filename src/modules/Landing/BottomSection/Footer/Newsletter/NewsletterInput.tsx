import React, { useState } from 'react'
import { useMutation } from 'react-query'
import useTranslation from 'next-translate/useTranslation'

import Icon from 'components/core/Icon'
import Typography from 'components/core/Typography'

import styles from './NewsletterInput.module.css'
import http from 'services/http-common'

interface IWaitlistData {
  email: string
}

export enum Message {
  _WRONG_EMAIL = "Ahh, snap! This email doesn't look right.",
  _SUCCESS = "Thanks! we'll let you know in first release!",
  _ALREADY_ADDED = "Thanks, we already had your email in our list. We'll let you know in first release!"
}

function NewsletterInput() {
  const { t } = useTranslation('landing')

  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({
    state: '0', // 0=null, 1=wrong email, 2=succes, 3=already exists in db
    message: ''
  })
  const onChangeEmail = (text: string) => {
    if (status.state !== '0') {
      setStatus({
        state: '0',
        message: ''
      })
    }
    setEmail(text)
  }

  const addToWaitlist = useMutation(
    (data: IWaitlistData) => {
      return http.post(`/addToWaitlist`, data)
    },
    {
      onSuccess: () => {
        setStatus({
          state: '2',
          message: Message._SUCCESS
        })
      },
      onError: () => {
        setStatus({
          state: '3',
          message: Message._ALREADY_ADDED
        })
      }
    }
  )

  const onSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      return setStatus({
        state: '1',
        message: Message._WRONG_EMAIL
      })
    }
    addToWaitlist.mutate({
      email
    })
  }
  return (
    <div className='col centerAll'>
      <div
        className={`relative p-[0.125rem] max-w-[31.125rem] flex-1 row centerAll rounded-3xl before:rounded-3xl before:p-[2px] ${styles.input_container}`}
      >
        <div
          className={`relative overflow-hidden max-w-[94vw] h-[2.8125rem] lg:h-[3.125rem] xl:h-[3.5rem] md:flex-1 md:w-full md:max-w-[31.125rem] bg-landing-gray_8  rounded-3xl flex items-center ${styles.input_inner_container}`}
        >
          <input
            value={email}
            onChange={e => onChangeEmail(e.target.value)}
            type='email'
            placeholder={t('NEWSLETTER_INPUT_PLACEHOLDER')}
            className='pl-3 md:pl-6 pr-2 w-auto text-xs md:text-sm lg:text-base xl:text-lg h-full outline-none md:flex-1 font-display placeholder-landing-gray_1 bg-landing-gray_8'
          />
          <button
            className='row items-center rounded-3xl text-white bg-landing-black py-[0.75rem] md:py-[0.625rem] lg:py-3 px-2 md:px-2 lg:px-4 mr-1 lg:mr-1 xl:mr-2'
            onClick={onSubmit}
          >
            <Typography
              type='button'
              className='whitespace-nowrap font-display font-medium'
            >
              {t('JOIN_WAITLIST')}
            </Typography>
            <Icon
              name='chevronRight'
              size={20}
              raw
              className='h-[0.75rem] w-[0.75rem] md:h-[1.25rem] md:w-[1.25rem] ml-1'
            />
          </button>
        </div>
      </div>

      {status.state !== '0' && (
        <Typography
          type='body'
          className={`mt-4 md:mt-[0.625rem] mx-4 md:mx-0 text-center ${
            status.state === '1'
              ? 'text-landing-pink_1'
              : 'text-landing-black_9'
          }`}
        >
          {status.message}
        </Typography>
      )}
    </div>
  )
}

export default NewsletterInput
