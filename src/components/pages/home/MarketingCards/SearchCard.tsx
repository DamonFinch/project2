import Typography from 'components/core/Typography'
import Image from 'next/image'
import React, { useCallback } from 'react'
import Pattern from 'assets/pattern.png'
import SearchCardImage from 'assets/marketingCards/searchCard.svg'
import Icon from 'components/core/Icon'
import { useAppDispatch } from 'store/hooks'
import { changeIsSearchInputFocused } from 'store/slices/app.slice'

const SearchCard = () => {
  const dispatch = useAppDispatch()

  const focusSearch = useCallback(
    () => dispatch(changeIsSearchInputFocused(true)),
    [dispatch]
  )

  return (
    <div
      onClick={focusSearch}
      className='rounded-lg h-[10.875rem] mb-4 cursor-pointer'
      style={{
        background: `url(${Pattern.src}), #53389E`,
        backgroundBlendMode: 'color-burn, normal'
      }}
    >
      <div className='flex flex-row items-center relative h-full'>
        {/* Content */}
        <Typography
          type='h2'
          className='!text-xl !leading-7 font-medium text-baseWhite ml-[0.625rem] w-[calc(100%-120px)]'
        >
          Get insights, search global news by asking questions below.
        </Typography>

        <div className='absolute right-0 top-0 bottom-0 h-full'>
          {/* Down hand arrow */}
          <Image
            src={SearchCardImage}
            className='h-full'
            alt='Add your news or contribute an article'
          />

          {/* Double Chevron */}
          <Icon
            name='doubleChevronDown'
            className='text-baseWhite absolute rotate-[8.46deg] w-[0.9375rem] h-[1.0625rem] right-7 bottom-4'
            size={17}
            raw
          />
        </div>
      </div>
    </div>
  )
}

export default SearchCard
