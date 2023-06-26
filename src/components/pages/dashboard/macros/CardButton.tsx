import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface CardButtonProps {
  src: string
  text: string
  href: string
}

const CardButton = ({ src, text, href }: CardButtonProps) => (
  <Link
    href={href}
    className={`flex h-12 w-[148px] items-center justify-center gap-2 rounded-[8px] no-underline ${
      text === 'Deposit'
        ? 'bg-grayMd text-white'
        : 'bg-white border-[1px] border-[#E6E6E6] text-grayMd'
    }`}
  >
    <Image src={src} alt='verify' height={24} width={24} />
    <p
      className={`text-base font-[500] leading-[120%] ${
        text === 'Deposit' ? 'text-white' : 'text-grayMd'
      }`}
    >
      {text}
    </p>
  </Link>
)

export { CardButton }
