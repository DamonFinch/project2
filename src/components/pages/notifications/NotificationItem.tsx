import Image from 'next/image'
import React from 'react'
import formatDistance from 'date-fns/formatDistance'
import { useMutation, useQueryClient } from 'react-query'
import http from 'services/http-common'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { timeDifference } from 'utils'

// Icons
import Invite from 'assets/notifications/Invite.svg'
import Comment from 'assets/notifications/Comment.svg'
import ChevronDown from 'assets/notifications/ChevronDownRed.svg'
import ChevronUp from 'assets/notifications/ChevronUpGreen.svg'
import Emoji from 'assets/notifications/Emoji.svg'
import Wallet from 'assets/notifications/Wallet.svg'
import Person from 'assets/notifications/Person.svg'

interface NotificationItemProps {
  type:
    | 'invite'
    | 'comment'
    | 'upvote'
    | 'downvote'
    | 'noNotification'
    | 'wallet'
    | 'reputation'
  status?: 'read' | 'unread'
  isPopup?: boolean
  text?: string
  createdAt?: string
  _id?: any
  post?: any
}

const ICON_TYPE: any = {
  invite: Invite,
  comment: Comment,
  upvote: ChevronUp,
  downvote: ChevronDown,
  noNotification: Emoji,
  wallet: Wallet,
  reputation: Person
}

const POST_NOTIFICATION_TYPES = ['upvote', 'downvote', 'comment']

const NotificationItem = ({
  isPopup,
  type,
  status,
  text,
  _id,
  post,
  createdAt
}: NotificationItemProps) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate, isLoading } = useMutation(
    id => {
      return http.patch(`/notification/markAsRead/${id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('fetchNotifications')
        queryClient.invalidateQueries('getNotifications')
      },
      onError: () => {
        toast.error('There was some error!')
      }
    }
  )

  const markAsRead = () => {
    mutate(_id)
  }

  const onNotificationClick = (e: any) => {
    if (e.target.classList.contains('dismissBtn')) {
      return
    }
    if (POST_NOTIFICATION_TYPES.includes(type)) {
      router.push(`/post/${post}`)
    }
    markAsRead()
  }

  return (
    <div
      className={`${
        status === 'unread'
          ? 'bg-here-pink-50 cursor-pointer'
          : 'bg-white'
      } flex items-center justify-between w-full ${
        !isPopup
          ? 'rounded-[8px] gap-4 py-4 px-4 md:px-[30px]'
          : 'gap-2 px-4 py-2'
      }`}
      onClick={onNotificationClick}
    >
      <div className={`flex flex-col gap-4 w-full`}>
        <div
          className={`${
            type === 'noNotification' || isPopup ? 'hidden' : ''
          } flex items-center gap-2`}
        >
          <div className='h-[6px] w-[6px] rounded-full bg-landing-gray_14' />
          <p className='text-xs sm:text-sm leading-[120%] text-landing-gray_14 font-[500]'>
            {createdAt
              ? formatDistance(new Date(createdAt), new Date(), {
                  addSuffix: true
                })
              : ''}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Image
            src={ICON_TYPE[type]}
            height={['upvote', 'downvote'].includes(type) ? 6 : 18}
            width={['upvote', 'downvote'].includes(type) ? 12 : 20}
            alt='icon'
          />
          <p
            className={`text-left leading-[25px] font-[400] ${
              type === 'upvote'
                ? 'text-[#59C591]'
                : type === 'downvote'
                ? 'text-[#E8294D]'
                : 'text-landing-gray_14'
            } ${isPopup ? 'text-sm' : 'text-sm md:text-base'} `}
          >
            {text}
          </p>
        </div>
      </div>
      <p
        className={`dismissBtn ${
          type === 'noNotification' || isPopup || status === 'read'
            ? 'hidden'
            : ''
        } text-sm md:text-base font-[500] leading-[19px] text-grayLight ${
          isLoading ? 'pointer-events-none' : 'cursor-pointer '
        }`}
        onClick={markAsRead}
      >
        Dismiss
      </p>
      <div
        className={`${
          !isPopup ? 'hidden' : ''
        } w-[60px] text-left flex items-center gap-2`}
      >
        <div className='h-[6px] w-[6px] rounded-full bg-landing-gray_14' />
        <p
          className={`${
            !isPopup ? 'hidden' : ''
          } text-left flex-none text-sm leading-[120%] text-grayLight cursor-pointer`}
        >
          {createdAt ? timeDifference(new Date(createdAt)) : '1s'}
        </p>
      </div>
    </div>
  )
}

export { NotificationItem }
