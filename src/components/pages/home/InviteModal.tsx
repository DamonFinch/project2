import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Input from 'components/core/Input'
import Modal from 'components/core/Modal'
import http from 'services/http-common'
import Form from 'components/core/Form'
import Button from 'components/core/Button'
import Typography from 'components/core/Typography'
import { subscribeValidation } from './Validation'
import mailIcon from 'assets/mail.svg'
import Wallet from 'assets/Wallet.svg'
import { deductBalance } from 'store/slices/auth.slice'
import { useDispatch } from 'react-redux'

interface InviteModalProps {
  isInviteVisible: boolean
  toggleIsInviteVisible: () => void
  refetchInvites?: () => void
}

interface IInviteUser {
  useremail: string
  balance: number
}

function InviteModal({
  isInviteVisible,
  toggleIsInviteVisible,
  refetchInvites
}: InviteModalProps) {
  const dispatch = useDispatch()
  const [useremail, setUseremail] = useState('')
  const [_balance, setBalance] = useState(10)
  const [message, setMessage] = useState({ status: '', text: '' })
  const [loading, setLoading] = useState(false)

  const handleUserEmailChange = useCallback(
    (name: string, value: any) => {
      if (name === 'useremail') {
        // Used replaceAll because the user might "Paste" an email address with spaces in there
        setUseremail(value.replaceAll(' ', ''))
      } else {
        setBalance(value)
      }
      setMessage({ status: '', text: '' })
    },
    []
  )

  const handleCloseModal = () => {
    setUseremail('')
    toggleIsInviteVisible()
    setMessage({ status: '', text: '' })
  }

  useEffect(() => {
    if (message?.status === 'success') {
      setTimeout(() => {
        setMessage({ status: '', text: '' })
        setUseremail('')
        handleCloseModal()
      }, 2000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message])

  function create({ ...value }) {
    const payload: IInviteUser = {
      useremail: value.useremail.trim().toLowerCase(),
      balance: 100
    }
    setLoading(true)
    http
      .post(`/send-invites`, payload)
      .then(res => {
        if (res?.data?.success) {
          setMessage({
            status: 'success',
            text: 'Great! You’ve invited a new person.'
          })
          refetchInvites && refetchInvites()
          dispatch(deductBalance(100))
          toast.success('Invite send successfully')
        } else {
          setMessage({
            status: 'error',
            text: res?.response?.data?.error?.message
          })
          toast.error(res?.response?.data?.error?.message)
        }
      })
      .catch(err => {
        toast.error('Error! Cannot send invitation')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Modal
      isVisible={isInviteVisible}
      onClose={handleCloseModal}
      showCloseButton
      className='bg-[#53389ea3] backdrop-blur-[2px]'
    >
      <div className='p-8 w-[300px] sm:w-[500px] flex flex-col gap-8 h-full rounded-lg'>
        <h2 className='text-[#667085] font-medium text-[24px] leading-[33px]'>
          Invite your friend!
        </h2>
        <Form
          onSubmit={async values => {
            create({ ...values })
          }}
          validationSchema={subscribeValidation}
          className='w-full flex flex-col gap-6'
          initialValues={''}
        >
          <div className='flex flex-col gap-2'>
            <p className='text-[#667085] text-sm md:text-base font-[400]'>
              Email of the person to be invite.
            </p>
            <Input
              name='useremail'
              value={useremail}
              onChange={(e: any) =>
                handleUserEmailChange('useremail', e.target.value)
              }
              className={`outline-none rounded-md h-[2.2rem] lg:h-[3rem] ${
                message?.status === 'error'
                  ? 'bg-[#F5F3FA]'
                  : 'bg-[#F9FAFB]'
              } border-[1px] border-[#e6e6e6] italic text-body text-base font-[300] ${
                message?.status === 'error' && 'border-bottom-red'
              }`}
              clasNameError={'border-bottom-red'}
              placeholder='Email'
              leftIcon={mailIcon}
              hookToForm
            />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-[#667085] text-sm md:text-base font-[400]'>
              Gift Token
            </p>
            <Input
              name='balance'
              value='100μ'
              onChange={(e: any) =>
                handleUserEmailChange('balance', e.target.value)
              }
              className={`outline-none rounded-md h-[2.2rem] lg:h-[3rem] ${
                message?.status === 'error'
                  ? 'bg-[#F5F3FA]'
                  : 'bg-[#F9FAFB]'
              } border-[1px] border-[#e6e6e6] italic text-body text-base font-[300] disabled:bg-[#e6e6e6] ${
                message?.status === 'error' && 'border-bottom-red'
              }`}
              clasNameError={'border-bottom-red'}
              placeholder='100μ'
              leftIcon={Wallet}
              hookToForm
              disabled
            />
          </div>
          {message.status && (
            <p
              className={`text-sm ${
                message.status === 'error'
                  ? 'text-[red]'
                  : 'text-[#59C591]'
              }`}
            >
              {message?.text}
            </p>
          )}
          <Button
            type='submit'
            size='small'
            outlined={false}
            className='w-full h-[3rem]'
            disabled={loading}
          >
            <Typography type='button' className='font-[500]'>
              {loading ? 'Sending...' : 'Send Invite'}
            </Typography>
          </Button>
        </Form>
      </div>
    </Modal>
  )
}

export default InviteModal
