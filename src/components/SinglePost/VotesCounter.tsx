import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import AnimatedNumber from 'react-awesome-animated-number'
import 'react-awesome-animated-number/dist/index.css'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import {
  deductBalance,
  toggleIsLoginModalVisible
} from 'store/slices/auth.slice'
import http from 'services/http-common'
import { HiChevronUp, HiChevronDown } from 'react-icons/hi'
import {
  TbArrowBigDown,
  TbArrowBigUp,
  TbArrowBigDownFilled,
  TbArrowBigUpFilled
} from 'react-icons/tb'
import Tooltip from 'components/Tooltip'
import Upvote from 'assets/upvote.svg'
import Downvote from 'assets/downvote.svg'
interface VotesCounterProps {
  posterID: string
  postId: string
  upvotes: string[]
  downvotes: string[]
  totalVotes: number
  tips: any
  horizontal?: boolean
}

const TOOLTIP_MESSAGES = [
  'Upvote this post if you find it helpful or interesting',
  'Tip the author of the post.',
  'Wanna give more tip to the author of the post.',
  'More Appreciation to the author'
]

function VotesCounter({
  posterID,
  postId,
  upvotes,
  downvotes,
  totalVotes,
  tips,
  horizontal = false
}: VotesCounterProps) {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const { selectedAccount, balance } = useAppSelector(
    state => state.auth
  )

  const [updatedUpvotes, setUpdatedUpvotes] = useState<string[]>([])
  const [updatedDownvotes, setUpdatedDownvotes] = useState<string[]>(
    []
  )
  const [updatedTips, setUpdatedTips] = useState([])

  const [votes, setVotes] = useState(totalVotes)
  const [voted, setVoted] = useState<'upvote' | 'downvote' | null>(
    null
  )
  const [strokeWidth, setStrokeWidth] = useState(0)
  const [numTips, setNumTips] = useState(0)

  const accountId = useMemo(
    () => selectedAccount && selectedAccount._id,
    [selectedAccount]
  )

  useEffect(() => {
    setVotes(totalVotes)
  }, [totalVotes])

  useEffect(() => {
    setUpdatedUpvotes(upvotes)
    setUpdatedDownvotes(downvotes)
  }, [upvotes, downvotes])

  useEffect(() => {
    setUpdatedTips(tips)
  }, [tips])

  useEffect(() => {
    if (accountId) {
      if (
        updatedUpvotes &&
        updatedUpvotes.length &&
        updatedUpvotes.includes(accountId)
      ) {
        setVoted('upvote')
      } else if (
        updatedDownvotes &&
        updatedDownvotes.length &&
        updatedDownvotes.includes(accountId)
      )
        setVoted('downvote')
      else setVoted(null)
    } else {
      setVoted(null)
    }
  }, [accountId, updatedUpvotes, updatedDownvotes])

  useEffect(() => {
    if (accountId) {
      if (updatedTips && updatedTips.length) {
        const findTip: any = updatedTips?.find(
          (tip: any) => tip.userId === accountId
        )
        if (findTip) {
          setNumTips(findTip?.count)
          setStrokeWidth(
            findTip?.count / 2 > 1.5 ? 1.5 : findTip?.count
          )
        } else {
          setNumTips(0)
        }
      }
    }
  }, [accountId, updatedTips])

  const handleUpvote = () => {
    if (!accountId) {
      dispatch(toggleIsLoginModalVisible(true))
      return
    }

    if (voted !== 'upvote') {
      setStrokeWidth(prev => (prev < 1.5 ? prev + 0.5 : prev))
      setVoted('upvote')
      setNumTips(1)
      setVotes(prev =>
        voted === 'downvote' ? (prev ? prev + 2 : prev + 1) : prev + 1
      )
      setVoted('upvote')
      handleUpvoteQuery.mutate({
        userId: accountId
      })
    } else if (numTips < 5) {
      setStrokeWidth(prev => (prev < 1.5 ? prev + 0.5 : prev))
      setNumTips(numTips + 1)
      handleTipToAuthorQuery.mutate()
    }
  }

  const handleUpvoteQuery = useMutation(
    (data: { userId: string }) => {
      return http.post(`/upvotePost/${postId}`, data)
    },
    {
      onSuccess: () => {
        if (selectedAccount) {
          if (
            updatedDownvotes.some(dv => dv === selectedAccount._id)
          ) {
            setUpdatedDownvotes(prev =>
              prev.filter(uid => uid !== selectedAccount._id)
            )
          }
          setUpdatedUpvotes(prev => [...prev, selectedAccount._id])
        }
        dispatch(deductBalance(1))
        queryClient.invalidateQueries('getExplorePosts')
        queryClient.invalidateQueries('getSinglePost')
      },
      onError: () => {
        toast.error('Error upvoting!')
      }
    }
  )

  const handleTipToAuthorQuery = useMutation(
    () => {
      return http.post(`/tipPostAuthor/${postId}`, {})
    },
    {
      onSuccess: () => {
        dispatch(deductBalance(1))
        queryClient.invalidateQueries('getExplorePosts')
      },
      onError: () => {
        toast.error('Error giving tip!')
      }
    }
  )

  const handleDownvote = () => {
    if (!accountId) {
      dispatch(toggleIsLoginModalVisible(true))
      return
    }
    if (voted === 'downvote') return
    if (
      updatedDownvotes &&
      updatedDownvotes.length &&
      updatedDownvotes.includes(accountId)
    )
      return

    setVotes(prev =>
      voted === 'upvote' ? (prev ? prev - 2 : prev - 1) : prev - 1
    )
    setStrokeWidth(0)

    setVoted('downvote')
    handleDownvoteQuery.mutate({
      userId: accountId
    })
  }

  const handleDownvoteQuery = useMutation(
    (data: { userId: string }) => {
      return http.post(`/downvotePost/${postId}`, data)
    },
    {
      onSuccess: () => {
        if (selectedAccount) {
          if (updatedUpvotes.some(dv => dv === selectedAccount._id)) {
            setUpdatedUpvotes(prev =>
              prev.filter(uid => uid !== selectedAccount._id)
            )
          }
          setUpdatedDownvotes(prev => [...prev, selectedAccount._id])
        }
        dispatch(deductBalance(1))
        queryClient.invalidateQueries('getExplorePosts')
        queryClient.invalidateQueries('getSinglePost')
      },
      onError: () => {
        toast.error('Error downvoting!')
      }
    }
  )

  const formatCount = useCallback((value: number) => {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
      compactDisplay: 'short',
      notation: 'compact'
    })
    return formatter.format(value)
  }, [])

  const formattedVotes = useMemo(
    () => formatCount(votes),
    [formatCount, votes]
  )
  const formattedUpvotes = useMemo(
    () => formatCount(upvotes.length),
    [upvotes, formatCount]
  )
  const formattedDownvotes = useMemo(
    () => formatCount(downvotes.length),
    [downvotes, formatCount]
  )

  const isLoading =
    handleDownvoteQuery.isLoading ||
    handleTipToAuthorQuery.isLoading ||
    handleUpvoteQuery.isLoading

  const upvoteRestrictions =
    numTips === 5 || posterID === selectedAccount?._id || balance <= 0

  const downvoteRestrictions =
    numTips >= 2 ||
    voted === 'downvote' ||
    posterID === selectedAccount?._id ||
    balance <= 0

  const upvoteMessage = useMemo(
    () =>
      posterID === selectedAccount?._id
        ? "You can't upvote or tip yourself"
        : balance === 0
        ? 'Balance is 0'
        : numTips === 5
        ? 'Cannot give more tip'
        : numTips > 2
        ? TOOLTIP_MESSAGES[3]
        : TOOLTIP_MESSAGES[numTips],
    [numTips, posterID, selectedAccount, balance]
  )

  const downvoteMessage = useMemo(
    () =>
      posterID === selectedAccount?._id
        ? "You can't downvote yourself"
        : balance === 0
        ? 'Balance is 0'
        : numTips >= 2 || voted === 'downvote'
        ? 'Cannot downvote this post now!'
        : 'Downvote this post if you find it non-interesting',
    [numTips, voted, posterID, selectedAccount, balance]
  )

  return horizontal ? (
    <div className='flex flex-row items-center justify-between gap-2 bg-white shadow-[0_2px_4px_rgba(83,56,158,0.08)] rounded-[8px] h-12 p-1'>
      <Tooltip
        id='upvoteButton'
        link={Upvote}
        message={upvoteMessage}
      >
        <div className='grid place-items-center rounded-[8px] bg-stroke h-10 w-10'>
          <HiChevronUp
            size={24}
            onClick={handleUpvote}
            strokeWidth={voted === 'upvote' ? strokeWidth : 0}
            color={voted === 'upvote' ? '#53389E' : '#858D9D'}
            fill={voted === 'upvote' ? '#53389E' : '#858D9D'}
            className={`text-grayMd ${
              upvoteRestrictions || isLoading
                ? 'pointer-events-none'
                : ''
            }`}
          />
        </div>
      </Tooltip>
      <AnimatedNumber
        className='select-none transition duration-100 ease-in-out text-base leading-[1.2125rem] tracking-medium text-body font-medium'
        // @ts-ignore
        value={formattedVotes}
        hasComma={false}
        size={16}
      />
      <Tooltip
        id='downvoteButton'
        link={Downvote}
        message={downvoteMessage}
      >
        <div className='grid place-items-center rounded-[8px] bg-stroke !h-10 !w-10'>
          <HiChevronDown
            size={24}
            color={voted === 'downvote' ? '#53389E' : '#858D9D'}
            fill={voted === 'downvote' ? '#53389E' : '#858D9D'}
            className={` text-grayMd ${
              downvoteRestrictions || isLoading
                ? 'pointer-events-none'
                : ''
            }`}
          />
        </div>
      </Tooltip>
    </div>
  ) : (
    <div className='flex flex-row items-center gap-1 bg-baseWhite rounded-lg border border-stroke border-opacity-50 pl-[0.625rem] pr-[0.875rem] py-1'>
      {/* Upvote button */}
      <Tooltip
        id='upvoteButton'
        link={Upvote}
        message={upvoteMessage}
      >
        <div
          className={`w-7 h-7 sm:w-10 sm:h-10 grid place-items-center rounded-lg ${
            voted === 'upvote'
              ? 'shadow-[0px_2px_4px_rgba(0,0,0,0.06)] bg-historic'
              : 'bg-transparent'
          } ${
            upvoteRestrictions || isLoading
              ? 'pointer-events-none'
              : ''
          }`}
          onClick={handleUpvote}
        >
          {voted === 'upvote' ? (
            <TbArrowBigUpFilled className='text-secondary w-5 h-5 sm:w-6 sm:h-6' />
          ) : (
            <TbArrowBigUp className='text-grayMd w-5 h-5 sm:w-6 sm:h-6' />
          )}
        </div>
      </Tooltip>

      {/* Upvote count */}
      <Tooltip id='upvoteCount' message='Total upvotes'>
        <div className='grid place-items-center'>
          <AnimatedNumber
            className='select-none transition duration-100 ease-in-out font-medium text-[0.625rem] sm:text-xs leading-[1.2rem] text-grayMedium'
            // @ts-ignore
            value={formattedUpvotes}
            hasComma={false}
            size={16}
          />
        </div>
      </Tooltip>

      {/* Downvote button */}
      <Tooltip
        id='downvoteButton'
        link={Downvote}
        message={downvoteMessage}
      >
        <div
          className={`w-7 h-7 sm:w-10 sm:h-10 grid place-items-center bg-historic rounded-lg ${
            voted === 'downvote'
              ? 'shadow-[0px_2px_4px_rgba(0,0,0,0.06)] bg-historic'
              : 'bg-transparent'
          } ${
            downvoteRestrictions || isLoading
              ? 'pointer-events-none'
              : ''
          }`}
          onClick={handleDownvote}
        >
          {voted === 'downvote' ? (
            <TbArrowBigDownFilled className='text-secondary w-5 h-5 sm:w-6 sm:h-6' />
          ) : (
            <TbArrowBigDown className='text-grayMd w-5 h-5 sm:w-6 sm:h-6' />
          )}
        </div>
      </Tooltip>

      {/* Downvote count */}
      <Tooltip id='downvoteCount' message='Total downvotes'>
        <div className='grid place-items-center'>
          <AnimatedNumber
            className='select-none transition duration-100 ease-in-out font-medium text-[0.625rem] sm:text-xs leading-[1.2rem] text-grayMedium'
            // @ts-ignore
            value={formattedDownvotes}
            hasComma={false}
            size={16}
          />
        </div>
      </Tooltip>
    </div>
  )
}

export default VotesCounter
