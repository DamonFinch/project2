import React, { useState } from 'react'

import FactsSlider from './FactsSlider'
import { leftItems, rightItems } from './data'

function Facts() {
  const [selectedSlide, setSelectedSlide] = useState(0)

  const toggleSelected = (index: number) => setSelectedSlide(index)

  return (
    <div
      className={`relative col md:flex-row items-center justify-between px-[1.25rem] lg:px-[2.1875rem] xl:px-[7rem] pt-[2.5rem] min-h-[30rem] gap-x-0 lg:gap-x-4 xl:gap-x-0 ${
        selectedSlide !== 0 ? '' : ''
      }`}
      style={{
        background:
          'linear-gradient(180deg, rgba(249,250,251,1) 0%, rgba(255,255,255,1) 5%, rgba(255,255,255,1) 50%, rgba(255,255,255,1) 100%)'
      }}
    >
      <div className='flex-1 lg:w-[50%]'>
        <FactsSlider
          items={leftItems}
          type='left'
          toggleSelected={toggleSelected}
          slideClassName='h-full w-full flex centerAll'
        />
      </div>
      <div className='flex-1 lg:w-[50%] px-[0.625rem] md:px-0'>
        <FactsSlider
          items={rightItems}
          type='right'
          toggleSelected={toggleSelected}
          slideClassName='h-full w-full flex items-center !rotate-180'
        />
      </div>
    </div>
  )
}

export default Facts
