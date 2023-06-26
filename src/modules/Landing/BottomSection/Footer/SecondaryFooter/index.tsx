import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

import Logo from 'assets/logo.png'

function SecondaryFooter() {
  const { t } = useTranslation('landing')
  return (
    <div className='mt-24 md:mt-40 w-full col md:flex-row centerAll md:items-center md:justify-between gap-y-4 gap-x-4 lg:gap-x-0'>
      <p className='hidden md:inline-block max-w-[14.5rem] w-full'>
        © 2023 Here News.
      </p>
      <Image
        src={Logo}
        alt='here.news logo'
        width={110}
        height={41}
      />

      <div className='row gap-x-[1.875rem]'>
        <Link
          href='#'
          className='no-underline'
          aria-label='Terms of Service'
        >
          <p className='text-xs md:text-base text-black'>
            {t('FOOTER_TOS')}
          </p>
        </Link>
        <Link
          href='#'
          className='no-underline'
          aria-label='Privacy Policy'
        >
          <p className='text-xs md:text-base text-black'>
            {t('FOOTER_PRIVACY')}
          </p>
        </Link>
      </div>
      <p className='inline-block md:hidden text-xs md:text-base'>
        © 2023 Here News.
      </p>
    </div>
  )
}

export default SecondaryFooter
