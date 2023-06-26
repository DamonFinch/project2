import React, { useEffect, useMemo, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { setLanguage } from 'store/slices/app.slice'
import useClickOutside from 'hooks/useClickOutside'

import Typography from 'components/core/Typography'
import Icon from 'components/core/Icon'

interface ISingleLanguage {
  name: string
  shortCode: string
  isSelected?: boolean
  onClick?: (shortCode: string) => void
}

const options = [
  {
    name: '简体中文', // Chinese Simplified,
    shortCode: 'zh-cn'
  },
  {
    name: '中國傳統的', // Chinese Traditional
    shortCode: 'zh-tw'
  },
  {
    name: 'English', // Englist
    shortCode: 'en'
  }
]

function SingleLanguage({
  shortCode,
  name,
  isSelected,
  onClick
}: ISingleLanguage) {
  return (
    <div
      className={`w-full h-9 md:h-12 border-y-[0.0625rem] border-l-landing-gray_17 flex centerAll gap-1 ${
        !isSelected
          ? 'cursor-pointer hover:bg-landing-gray_17'
          : 'bg-landing-gray_17'
      }`}
      onClick={() =>
        !isSelected && onClick ? onClick(shortCode) : {}
      }
    >
      <Typography
        type='button'
        className='text-landing-black font-medium'
      >
        {name}
      </Typography>
      {isSelected && <Icon raw name='chevronUp' />}
    </div>
  )
}

function LanguageSelect() {
  const dispatch = useAppDispatch()
  const languageState = useAppSelector(
    state => state.app && state.app.language
  )

  const [selectedShortCode, setSelectedShortCode] = useState('en')
  const [isShowingOptions, setIsShowingOptions] = useState(false)

  useEffect(() => {
    setSelectedShortCode(languageState.code)
  }, [languageState])

  const toggleShowingOptions = () =>
    setIsShowingOptions(prev => !prev)

  const selectedLanguage = useMemo(
    () =>
      options.find(option => option.shortCode === selectedShortCode),
    [selectedShortCode]
  )

  const { ref: langRef } = useClickOutside({
    shouldRegister: isShowingOptions,
    onOutsideClick: () => toggleShowingOptions()
  })

  const handleLanguageChange = async (shortCode: string) => {
    setSelectedShortCode(shortCode)
    dispatch(
      setLanguage({
        code: shortCode,
        loading: true
      })
    )
    toggleShowingOptions()
  }

  if (!selectedLanguage) return <React.Fragment />

  return (
    <div className='relative'>
      <div
        className={`mr-2 w-[95px] md:w-[144px] h-9 md:h-12 border-[1px] ${
          isShowingOptions
            ? 'border-transparent'
            : 'border-landing-gray_16'
        } rounded-3xl flex centerAll gap-1 cursor-pointer`}
        onClick={() =>
          !languageState.loading ? toggleShowingOptions() : {}
        }
      >
        {!languageState.loading ? (
          <React.Fragment>
            <Typography
              type='button'
              className='text-landing-black font-medium'
            >
              {selectedLanguage.name}
            </Typography>
            <Icon raw name='chevronDown' />
          </React.Fragment>
        ) : (
          <div className='animate-spin'>
            <Icon name='loading' raw />
          </div>
        )}
      </div>

      {isShowingOptions && (
        <div
          ref={langRef}
          className='w-[97px] md:w-[144px] bg-white border-[1px] border-landing-gray_13 rounded-3xl absolute overflow-hidden -top-[1px] -left-[1px] md:left-0'
        >
          <SingleLanguage
            name={selectedLanguage.name}
            shortCode={selectedLanguage.shortCode}
            isSelected
          />
          {options
            .filter(
              option =>
                option.shortCode !== selectedLanguage.shortCode
            )
            .map(option => (
              <SingleLanguage
                key={option.shortCode}
                name={option.name}
                shortCode={option.shortCode}
                onClick={handleLanguageChange}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSelect
