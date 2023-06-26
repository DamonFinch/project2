import axios from 'axios'
import Loader from 'components/Loader'
import Button from 'components/core/Button'
import Icon from 'components/core/Icon'
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'

const TitleInput = () => {
  const maxLength = 160
  const name = 'title'

  const { register, setValue, watch, getValues } = useFormContext()
  const [canRecreateTitle, setCanRecreateTitle] = useState(
    getValues(name) === undefined
  )
  const [isCreated, setIsCreated] = useState<boolean>(false)

  const content: string = watch('content')

  const { mutate, isLoading: isGeneratingTitle } = useMutation({
    mutationFn: async (content: string) => {
      const response = await axios.post(
        'https://us-central1-phonic-jetty-356702.cloudfunctions.net/generateTitleForPost',
        {
          content
        }
      )

      return {
        title: response.data.title
      }
    },
    onSuccess: data => {
      setIsCreated(true)

      if (data.title?.trim().length > 0) {
        setCanRecreateTitle(true)

        const currentTitle = getValues(name)
        if (!currentTitle || currentTitle.trim().length === 0) {
          setValue(name, data.title)
        }
      }
    }
  })

  useEffect(() => {
    if (!content) {
      return
    }

    if (
      content.split(' ').length > 80 &&
      !isGeneratingTitle &&
      !isCreated
    ) {
      mutate(content)
    } else if (content.trim().length <= 7 && isCreated) {
      setValue(name, '')
      setCanRecreateTitle(true)
      setIsCreated(false)
    }
  }, [content, mutate, isGeneratingTitle, isCreated, name, setValue])

  const onInputFocus = useCallback(() => {
    canRecreateTitle && setCanRecreateTitle(false)
  }, [canRecreateTitle])

  const shouldShowInput = useMemo(
    () =>
      content &&
      (content.trim().split(' ').length > 80 || isGeneratingTitle),
    [content, isGeneratingTitle]
  )

  const handleCreateTitle = useCallback(() => {
    if (!content) {
      return
    }

    if (
      content.split(' ').length > 80 &&
      !isGeneratingTitle &&
      isCreated
    ) {
      mutate(content)
    }
  }, [content, isGeneratingTitle, isCreated, mutate])

  return shouldShowInput ? (
    <div className='flex flex-row justify-between items-center flex-wrap pl-4 gap-2 pr-3 min-h-[3.75rem] py-[0.625rem] bg-transparent'>
      <input
        className={`placeholder:italic text-base outline-none p-0 bg-transparent placeholder:font-light flex-1 leading-[1.6rem] ${
          canRecreateTitle
            ? 'text-grayL font-medium'
            : 'text-header font-normal'
        }`}
        onFocus={onInputFocus}
        placeholder='Title (Optional)'
        maxLength={maxLength}
        {...register(name)}
      />

      {canRecreateTitle && (
        <Button
          onClick={handleCreateTitle}
          disabled={isGeneratingTitle}
          className={`!p-2 !rounded-lg !bg-baseWhite !border-0 grid place-items-center shrink-0 ${
            isGeneratingTitle
              ? 'cursor-not-allowed'
              : 'cursor-pointer'
          }`}
        >
          {isGeneratingTitle ? (
            <Loader color='fill-body' className='h-6 w-6' />
          ) : (
            <Icon name='repeat' raw />
          )}
        </Button>
      )}
    </div>
  ) : (
    <></>
  )
}

export default TitleInput
