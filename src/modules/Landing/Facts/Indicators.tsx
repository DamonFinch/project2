import React from 'react'
import Image from 'next/image'

import FilledCircle from 'assets/landing/filled-circle.webp'
import UnfilledCircle from 'assets/landing/unfilled-circle.webp'

interface IIndicators {
  selected: number
}

function Indicators({ selected }: IIndicators) {
  return (
    <React.Fragment>
      {Array(4)
        .fill(null)
        .map((_, i) => {
          return (
            <Image
              key={i}
              alt='slide circle'
              src={i === selected ? FilledCircle : UnfilledCircle}
              width={16}
              height={16}
              className='object-contain'
            />
          )
        })}
    </React.Fragment>
  )
}

export default Indicators
