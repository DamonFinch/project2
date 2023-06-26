import React from 'react'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'

import Logo from 'assets/logo.png'

import Icon from 'components/core/Icon'
import styles from './Header.module.css'
import Typography from 'components/core/Typography'
import Link from 'next/link'
import LanguageSelect from './LanguageSelect'

function Header() {
  const { t } = useTranslation('landing')

  return (
    <div className='relative row items-center justify-between h-20 md:h-24 mx-[1.25rem] lg:mx-[7rem] z-[1] flex-wrap sm:mt-0 gap-y-4 md:gap-y-0'>
      <div className='relative w-[5.3125rem] h-[1.9937rem] md:w-[6.875rem] md:h-[2.5812rem] '>
        <Image src={Logo} alt='here.news logo' fill />
      </div>
      <div className='flex items-center'>
        <LanguageSelect />
        <Link href='/home'>
          <div className='relative px-4 gap-x-1 w-[85px] md:w-[99px] h-9 md:h-11 bg-landing-black flex items-center justify-between rounded-3xl overflow-hidden cursor-pointer'>
            <div
              className={`w-16 h-16 absolute rounded-full blur-[1.9063rem] ${styles.button_shimmer}`}
            />
            <Typography
              type='button'
              className='font-medium text-white font-display z-[1]'
            >
              {t('LOGIN')}
            </Typography>
            <Icon
              name='chevronRight'
              raw
              className='text-white text-xl'
            />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Header
