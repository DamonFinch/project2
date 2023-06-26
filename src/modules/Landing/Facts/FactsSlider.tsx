import React from 'react'
import dynamic from 'next/dynamic'
import { Autoplay } from 'swiper'

const Slider = dynamic(() => import('components/core/Slider'))

import 'swiper/css/autoplay'

interface IFactsSlider {
  items: (
    | {
        Item: () => JSX.Element
        notImage?: undefined
      }
    | {
        Item: () => JSX.Element
        notImage: boolean
      }
  )[]
  type: 'left' | 'right'
  toggleSelected: (_index: number) => void
  slideClassName: string
}

function FactsSlider({
  items,
  type,
  toggleSelected,
  slideClassName
}: IFactsSlider) {
  return (
    <Slider
      sliderProps={{
        modules: [Autoplay],
        slidesPerView: 1,
        direction: 'vertical',
        autoplay: {
          delay: 5200
        },
        onSlideChange: swiper => toggleSelected(swiper.activeIndex),
        allowTouchMove: false,
        effect: 'fade'
      }}
      className={`h-[25rem] md:h-[30rem] 3xl:h-[31.25rem] ${
        type === 'right' ? 'rotate-180' : ''
      }`}
      slideClassName={slideClassName}
    >
      {items.map((item, i) => {
        return (
          <div
            key={i}
            className={
              type === 'left'
                ? 'row items-center h-full'
                : `row h-full items-center justify-center ${
                    item.notImage
                      ? 'md:justify-end'
                      : 'justify-center'
                  }`
            }
          >
            <item.Item />
          </div>
        )
      })}
    </Slider>
  )
}

export default FactsSlider
