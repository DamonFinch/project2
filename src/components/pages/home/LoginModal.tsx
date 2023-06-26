import React, { useState } from 'react'
import { toast } from 'react-toastify'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  setSelectedAccount,
  setAccounts,
  toggleIsLoginModalVisible,
  toggleIsForgotModalVisible,
  setBalance
} from 'store/slices/auth.slice'
import lockIcon from 'assets/lock.svg'
import userIcon from 'assets/username.svg'
import Input from 'components/core/Input'
import Modal from 'components/core/Modal'
import { setTokenInCookies } from 'lib/token'
import http from 'services/http-common'
import Form from 'components/core/Form'
import { loginValidation } from './Validation'
import Button from 'components/core/Button'
import Typography from 'components/core/Typography'

interface LoginModalProps {
  isLoginVisible: boolean
  toggleIsLoginVisible: () => void
}

interface ILoginUser {
  username: string
  password: string
}

function LoginModal({
  isLoginVisible,
  toggleIsLoginVisible
}: LoginModalProps) {
  const dispatch = useAppDispatch()
  const isGlobalModalVisible = useAppSelector(
    state => state.auth && state.auth.isLoginModalVisible
  )

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberBe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleUsernameChange = (value: any) => {
    setUsername(value?.target?.value)
  }

  const handlePasswordChange = (value: any) => {
    setPassword(value?.target?.value)
  }

  const handleCloseModal = () => {
    setUsername('')
    setPassword('')
    isGlobalModalVisible && dispatch(toggleIsLoginModalVisible(false))
    isLoginVisible && toggleIsLoginVisible()
  }

  function create({ ...value }) {
    setLoading(true)
    const payload: ILoginUser = {
      username: username.trim(),
      password: password.trim()
    }
    http
      .post(`/login`, payload)
      .then(({ data }) => {
        const { userList, token } = data?.data
        if (rememberBe) {
          setTokenInCookies(token, 7)
        } else {
          setTokenInCookies(token, null)
        }
        dispatch(setAccounts(userList))
        dispatch(setSelectedAccount(userList[0]))
        dispatch(setBalance(userList[0]?.balance))
        handleCloseModal()
      })
      .catch(_err => {
        toast.error('Username or password incorrect!')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Modal
      isVisible={isLoginVisible || isGlobalModalVisible}
      onClose={handleCloseModal}
      showCloseButton
    >
      <div className='p-6 w-[400px] h-full rounded-lg'>
        <p className='text-[#667085] text-[26px] mb-7'>
          Welcome to Here!
        </p>
        <Form
          onSubmit={async values => {
            create({ ...values })
          }}
          validationSchema={loginValidation}
          className='w-full mb-2'
          initialValues={''}
        >
          <div className='mb-6'>
            <div className='mb-2'>
              <p className='text-[#667085]'>Email</p>
            </div>
            <Input
              name='username'
              value={username}
              onChange={handleUsernameChange}
              className={
                'outline-none rounded-md h-[2.2rem] lg:h-[3rem] bg-[#F2F4F5] border-none italic text-body'
              }
              clasNameError={'border-bottom-red'}
              placeholder='Username or Email'
              leftIcon={userIcon}
              hookToForm
            />
          </div>

          <div className='mb-6'>
            <div className='mb-2'>
              <p className='text-[#667085]'>Password</p>
            </div>
            <Input
              name='password'
              value={password}
              onChange={handlePasswordChange}
              className={
                'outline-none rounded-md h-[2.2rem] lg:h-[3rem] bg-[#F2F4F5] border-none italic text-body'
              }
              type='password'
              clasNameError={'border-bottom-red'}
              placeholder='Password'
              leftIcon={lockIcon}
              hookToForm
            />
          </div>

          <div className='mb-6'>
            <div className='flex items-center justify-between'>
              <label className='flex items-center gap-2'>
                <input
                  name='checkbox'
                  type='checkbox'
                  checked={rememberBe}
                  onChange={e => setRememberMe(e.target.checked)}
                />
                <div>
                  <p className='text-grayLight'>Remember me</p>
                </div>
              </label>
              <div
                className='cursor-pointer'
                onClick={() => {
                  toggleIsLoginVisible()
                  dispatch(toggleIsForgotModalVisible(true))
                }}
              >
                <p className='text-grayLight underline'>
                  Forgot my password
                </p>
              </div>
            </div>
          </div>

          <Button
            type='submit'
            size='small'
            outlined={false}
            className='w-full mt-2'
          >
            <Typography type='button'>
              {loading ? 'Login...' : 'Login'}
            </Typography>
          </Button>
        </Form>
      </div>
    </Modal>
  )
}

export default LoginModal
