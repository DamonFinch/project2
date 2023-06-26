import React from 'react'

interface IActivitiesItemProps {
  name: string
  desc: string
  isLink?: boolean
  onClick?: () => void
  className?: string
}

const ActivitiesItem = ({
  name,
  desc,
  isLink,
  onClick,
  className
}: IActivitiesItemProps) => (
  <div
    className={`min-w-[6.5rem] md:min-w-[8rem] flex flex-col gap-2 ${className}`}
  >
    <p
      className={`text-[20px] font-[500] leading-7 text-body ${
        isLink
          ? 'w-fit border-b-[1px] md:border-b-[2px] border-body cursor-pointer'
          : 'pointer-events-none'
      }`}
      onClick={onClick}
    >
      {name}
    </p>
    <p className='text-sm font-[400] leading-[22px] text-grayMd'>
      {desc}
    </p>
  </div>
)

export { ActivitiesItem }
