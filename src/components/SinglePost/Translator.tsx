import Icon from 'components/core/Icon'
import React, { useCallback, useState } from 'react'
import Button from 'components/core/Button'
import Typography from 'components/core/Typography'
import { toggleIsLoginModalVisible } from 'store/slices/auth.slice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import Popover from 'components/Popover'
import { languages as allLanguages } from 'const'
import styles from './index.module.css'

interface Props {
  onLanguageChange: (language: string) => void
}

export default function Translator({ onLanguageChange }: Props) {
  const [isAllowed, setIsAllowed] = useState<boolean>(false)
  const [languages, setLanguages] = useState<string[] | undefined>([
    'en'
  ])
  const [selectedLanguage, setSelectedLanguage] = useState(
    languages?.[0]
  )

  const dispatch = useAppDispatch()
  const selectedAccount = useAppSelector(
    state => state.auth.selectedAccount?._id
  )

  const allowTranslation = useCallback(() => {
    if (!selectedAccount) {
      dispatch(toggleIsLoginModalVisible(true))
      return
    }

    setIsAllowed(true)
  }, [dispatch, selectedAccount])

  const onClick = useCallback(
    (code: string) => {
      if (code !== selectedLanguage) {
        setSelectedLanguage(code)
        onLanguageChange(code)
      }

      if (!languages?.includes(code)) {
        const updatedList = [
          ...(languages?.slice(0, 2)?.filter(lang => !!lang) || []),
          code
        ]

        setLanguages(updatedList)
      }
    },
    [languages, onLanguageChange, selectedLanguage]
  )

  if (!isAllowed)
    return (
      <Button
        variant='light'
        size='medium'
        className='!bg-transparent !border-0 ml-auto flex flex-row items-center gap-1 !p-2'
        onClick={allowTranslation}
      >
        <Typography
          type='body'
          className='font-normal !text-xs sm:!text-base !leading-[1.6rem] text-grayMd'
        >
          Translate
        </Typography>

        <Icon
          name='chevronRight'
          size={24}
          className='text-grayMd'
          raw
        />
      </Button>
    )

  return (
    <div className='rounded-lg bg-grayish py-0.5 px-2 ml-auto flex flex-row gap-[0.4735rem]'>
      {languages?.map((lang, index) => (
        <div
          onClick={() => onClick(lang)}
          key={lang}
          className='flex items-center flex-row gap-[0.4735rem]'
        >
          {index !== 0 && <Icon name='switch' raw />}
          <Typography
            type='body'
            className={`rounded-[0.25rem] ${
              selectedLanguage === lang
                ? 'bg-primary text-baseWhite'
                : 'bg-transparent text-body'
            } grid place-items-center !leading-[0.9rem] tracking-medium !text-xs font-medium uppercase w-[1.625rem] h-[1.625rem] cursor-pointer transition-all`}
          >
            {lang}
          </Typography>
        </div>
      ))}

      <Popover>
        <Icon
          name='chevronDown'
          raw
          className='text-body'
          size={16}
        />

        {() => (
          <div
            className={`bg-grayish rounded-lg p-2 max-h-[50vh] overflow-y-scroll overflow-x-hidden ${styles.languageList}`}
          >
            {allLanguages
              .map(lang => lang[lang.length - 1])
              .filter(
                lang =>
                  selectedLanguage !== lang &&
                  !languages?.includes(lang)
              )
              .map(lang => (
                <div
                  onClick={() => onClick(lang)}
                  className='!w-[1.625rem] !h-[1.625rem] cursor-pointer !bg-grayish hover:!bg-slate-200 grid place-items-center !p-0 !border-0'
                  key={lang}
                >
                  <Typography
                    type='body'
                    className='my-1 !leading-[0.9rem] text-body tracking-medium !text-xs font-medium uppercase '
                  >
                    {lang}
                  </Typography>
                </div>
              ))}
          </div>
        )}
      </Popover>
    </div>
  )
}
