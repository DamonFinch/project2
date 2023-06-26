import React from 'react'
import Image, { StaticImageData } from 'next/image'
import Typography from 'components/core/Typography'

interface IBubble {
  MemberImage: StaticImageData
  name: string
  designation: string
  designationTwo?: string | undefined
}

function Bubble({
  MemberImage,
  name,
  designation,
  designationTwo
}: IBubble) {
  return (
    <div className='bg-here-gray-50 w-[98px] h-[98px] md:w-[160px] md:h-[160px] lg:w-[200px] lg:h-[200px] xl:w-[217px] xl:h-[217px] p-[5px] md:p-[12px] lg:p-[14px] xl:p-[19px] rounded-full border-[1px] border-landing-gray_15 flex centerAll'>
      <div className='relative rounded-full w-full h-full border-[1px] border-landing-gray_15 overflow-hidden flex items-end'>
        <Image
          src={MemberImage}
          fill
          alt='name'
          className='scale-[1.1]'
        />
        <div className='w-full h-[46%] rounded-b-full z-[1] bg-[rgba(255,255,255,0.32)] backdrop-blur-[12px] flex flex-col centerAll'>
          <Typography
            type='none'
            className='text-[8px] md:text-xs lg:text-sm xl:text-base font-semibold text-landing-black_4 lg:leading-[22px]'
          >
            {name}
          </Typography>
          <Typography
            type='none'
            className='text-[7px] md:text-[10px] lg:text-xs text-landing-black_10 leading-[8px] md:leading-[inherit]'
          >
            {designation}
          </Typography>
          {designationTwo && (
            <Typography
              type='none'
              className='text-[7px] md:text-[10px] lg:text-xs text-landing-black_10 leading-[8px] md:leading-[inherit]'
            >
              {designationTwo}
            </Typography>
          )}
        </div>
      </div>
    </div>
  )
}

export default Bubble
