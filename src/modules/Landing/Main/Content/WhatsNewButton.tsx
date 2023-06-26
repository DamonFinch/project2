import React, { useMemo } from 'react'

import Typography from 'components/core/Typography'

import styles from './WhatsNewButton.module.css'
import Icon from 'components/core/Icon'
import useTranslation from 'next-translate/useTranslation'

interface IWhatsNewButton {
  onClick: () => void
}

function WhatsNewButton({ onClick }: IWhatsNewButton) {
  const { lang } = useTranslation('landing')
  const isEnglish = useMemo(() => lang && lang === 'en', [lang])
  return (
    <div
      className={`col centerAll px-1 py-1 md:px-[0.875rem] md:py-3 rounded-full ${styles.button_whats_here}`}
      onClick={onClick}
    >
      <div
        className={`relative bg-landing-black_2 text-white rounded-full ${
          isEnglish
            ? 'max-w-[10rem] md:max-w-none w-[36vw] md:w-[186px] lg:w-[186px]'
            : ''
        } h-[2.25rem] md:h-[53px] ${styles.button_whats_here_inner}`}
      >
        <div
          className={`flex items-center h-full ${
            isEnglish
              ? 'max-w-[10rem] md:max-w-none w-[38vw] md:w-[186px] lg:w-[186px]'
              : ''
          } py-1 px-2 md:px-3 gap-[0.25rem] md:gap-3`}
        >
          <Icon raw name='play' className='w-5 h-5 md:w-7 md:h-7' />
          {isEnglish && (
            <div className='col items-center'>
              <Typography
                type='button'
                className='font-display text-landing-gray_3 font-semibold'
              >
                What’s here?
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WhatsNewButton
