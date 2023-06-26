import Image from 'next/image'
import React from 'react'

// Icons
import VerifyIcon from 'assets/dashboard/verify.svg'
import VerifiedIcon from 'assets/dashboard/verified.svg'
import { useMutation } from 'react-query'
import http from 'services/http-common'
import { toast } from 'react-toastify'

interface IVerifyUserItemProps {
  email: string
  status: string
  onClick?: () => void
  className?: string
  isVerified?: boolean
  accepted?: boolean
  refetchInvitedUser?: () => void
}

const VerifyUserItem = ({
  email,
  status,
  className,
  isVerified,
  accepted,
  refetchInvitedUser
}: IVerifyUserItemProps) => {
  const verifyUser = useMutation(
    (payload: any) => {
      return http.put(`/verifyUser`, payload)
    },
    {
      onSuccess: data => {
        if (data?.data?.success) {
          toast.success('User verified successfully')
          refetchInvitedUser && refetchInvitedUser()
        } else {
          toast.error(data?.response?.data?.error?.message)
        }
      },
      onError: err => {
        toast.error('Error! Cannot verify user!')
      }
    }
  )

  function verify(useremail: string) {
    verifyUser.mutate({
      useremail
    })
  }

  return (
    <div
      className={`flex flex-row items-center justify-between gap-2 pr-2 md:pr-8 ${className}`}
    >
      <div className='h-10 flex flex-row gap-[10px] md:gap-8 items-center'>
        <p className='min-w-[15rem] text-sm md:text-base font-[400] leading-[25px] text-grayMd lowercase'>
          {email}
        </p>
        <p
          className={`hidden sm:block text-sm font-[400] leading-[22px] ${
            status === 'pending' ? 'text-grayL' : 'text-[#59C591] '
          } capitalize`}
        >
          {status}
        </p>
      </div>
      {accepted ? (
        <button
          className={`flex h-10 w-10 sm:w-[94px] ${
            isVerified ? 'bg-pearl cursor-not-allowed' : 'bg-historic'
          } ${
            verifyUser?.isLoading ? 'opacity-40' : ''
          } items-center justify-center gap-2 rounded-[8px] border-[1px] border-[#E6E6E6]`}
          onClick={() => verify(email)}
          disabled={verifyUser?.isLoading || isVerified}
        >
          <Image
            src={isVerified ? VerifiedIcon : VerifyIcon}
            alt='verify'
            height={18}
            width={18}
          />
          <p
            className={`hidden sm:block text-sm font-[500] ${
              isVerified ? 'text-primary' : 'text-body'
            } leading-[2px]`}
          >
            {isVerified ? 'Verified' : 'Verify'}
          </p>
        </button>
      ) : null}
    </div>
  )
}

export { VerifyUserItem }
