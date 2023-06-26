import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const Dropdown = ({ options, width }: any) => {
  return (
    <div
      className={`absolute top-10 md:top-12 right-0 ${
        width ? width : 'w-[218px]'
      }  divide-y-[1px] divide-[#e6e6e6] bg-white rounded-[8px] shadow-md`}
    >
      {options.map((item: any, i: number) => (
        <Link
          href={item.route}
          key={i}
          className={`w-full flex items-center px-4 bg-white hover:bg-lightPurple py-2 gap-2 h-16 cursor-pointer no-underline ${
            i === 0
              ? 'rounded-[8px_8px_0_0]'
              : i === options.length - 1
              ? 'rounded-[0_0_8px_8px]'
              : ''
          }`}
        >
          <>
            {item?.icon ? (
              <Image
                src={item.icon}
                alt='icon'
                height={24}
                width={24}
                className=''
              />
            ) : null}
            <p
              className={`text-base font-[500] leading-[120%] text-gray5`}
            >
              {item.name}
            </p>
          </>
        </Link>
      ))}
    </div>
  )
}

export { Dropdown }
