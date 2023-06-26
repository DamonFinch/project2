import React from 'react'
import Link from 'next/link'
import {
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsLinkedin,
  BsTelegram
} from 'react-icons/bs'
import Social from 'components/core/Social'
import Typography from 'components/core/Typography'

function Socials() {
  const socials = [
    {
      name: 'Facebook',
      Icon: BsFacebook,
      link: 'https://www.facebook.com/Herenews-102925039357397'
    },
    {
      name: 'Twitter',
      Icon: BsTwitter,
      link: 'https://twitter.com/heresnews'
    },
    {
      name: 'Instagram',
      Icon: BsInstagram,
      link: 'https://www.instagram.com/heresnews/'
    },
    {
      name: 'Linkedin',
      Icon: BsLinkedin,
      link: 'https://www.linkedin.com/company/here-news'
    },
    {
      name: 'Telegram',
      Icon: BsTelegram,
      link: 'https://t.me/heresnews'
    }
  ]
  return (
    <div className='mt-[5rem] col items-center'>
      <div className='row flex-wrap gap-x-8 md:gap-x-[2.5rem]'>
        {socials.map(social => {
          return (
            <Social
              name={social.name}
              Icon={social.Icon}
              link={social.link}
              key={social.link}
            />
          )
        })}
      </div>
      <Link
        href='mailto:socialmedia@here.news'
        passHref={true}
        className='no-underline'
        aria-label='here.news Email'
      >
        <Typography
          type='link'
          className='mt-4 text-landing-gray_9 no-underline'
        >
          SocialMedia@here.news
        </Typography>
      </Link>
    </div>
  )
}

export default Socials
