import Typography from 'components/core/Typography'
import React, { useCallback } from 'react'
import Pattern from 'assets/pattern.png'
import Image from 'next/image'
import { useRouter } from 'next/router'
import PurpleLogo from 'assets/marketingCards/purpleLogo.svg'
import ExploreCardImage from 'assets/marketingCards/exploreCard.svg'

const ExploreCard = () => {
  const router = useRouter()

  const navigateToExplore = useCallback(() => {
    router.push('/explore')
  }, [router])

  return (
    <div
      onClick={navigateToExplore}
      className='rounded-lg p-4 mb-4 cursor-pointer'
      style={{
        background: `url(${Pattern.src}), #D7C6FE`,
        backgroundBlendMode: 'color-burn, normal'
      }}
    >
      <div className='flex flex-col gap-2'>
        {/* Header */}
        <div className='flex flex-row justify-between items-center'>
          <Image src={PurpleLogo} alt='Here.news logo' />
          <Image src={ExploreCardImage} alt='Explore card' />
        </div>

        {/* Content */}
        <Typography
          type='subtitle'
          className='text-xl leading-7 font-medium text-primary'
        >
          Discover additional new content from our community and rate
          it promptly.
        </Typography>
      </div>
    </div>
  )
}

export default ExploreCard
