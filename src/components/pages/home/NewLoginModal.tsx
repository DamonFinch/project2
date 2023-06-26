import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  setSelectedAccount,
  setAccounts,
  toggleIsLoginModalVisible,
  setBalance
} from 'store/slices/auth.slice'

import Input from 'components/Input'
import Modal from 'components/core/Modal'
import Media from 'components/core/Media'

import Logo from 'assets/logo.png'
import Image from 'next/image'
import Typography from 'components/core/Typography'
import Clickable from 'components/core/Clickable'
import Button from 'components/core/Button'
import Link from 'next/link'
import http from 'services/http-common'

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

  const handleUsernameChange = (value: string) => {
    setUsername(value)
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
  }

  const handleCloseModal = () => {
    setUsername('')
    setPassword('')
    isGlobalModalVisible && dispatch(toggleIsLoginModalVisible(false))
    isLoginVisible && toggleIsLoginVisible()
  }

  const loginUser = useMutation(
    (user: ILoginUser) => {
      return http.post(`/login`, user)
    },
    {
      onSuccess: ({ data }) => {
        dispatch(setAccounts(data.data))
        dispatch(setSelectedAccount(data.data[0]))
        dispatch(setBalance(data.data[0]?.balance))
        handleCloseModal()
      },
      onError: () => {
        toast.error('Username or password incorrect!')
      }
    }
  )

  function handleLoginUser() {
    if (username && password) {
      loginUser.mutate({
        username,
        password
      })
    } else {
      toast.error('Username & Password required!')
    }
  }

  return (
    <Modal
      isVisible={isLoginVisible || isGlobalModalVisible || true}
      onClose={handleCloseModal}
    >
      <div className='row w-[85vw] h-[85vh] bg-white rounded-3xl overflow-hidden'>
        <div className='flex-[0.55] relative'>
          <div className='absolute top-0 left-0 w-full h-full'>
            <Media
              type='video'
              className='min-w-full min-h-full h-auto object-cover'
              link={require('assets/landing/cards/9.mp4')}
              videoProps={{
                controls: false,
                autoPlay: true,
                muted: true,
                loop: true,
                height: 700
              }}
              containerClasses='h-full w-full'
            />
          </div>

          <div className='relative h-[92%] m-9 mb-6 col justify-between z-[1]'>
            <div className='relative w-[106px] h-[40px] md:w-[6.875rem] md:h-[2.5812rem] '>
              <Image src={Logo} alt='here.news logo' fill />
            </div>
            <Typography
              type='subtitle-small'
              className='text-white font-medium'
            >
              A new era of news platform
            </Typography>
          </div>
        </div>
        <div className='flex-[0.45] col justify-center'>
          <div className='mx-[52px] h-full'>
            <div className='h-[90%] col justify-center'>
              <Typography type='subtitle-2' className='font-medium'>
                Login
              </Typography>
              <Input
                value={username}
                onChange={handleUsernameChange}
                type='text'
                placeholder='Enter your username'
                className='mt-[2.1875rem] w-full'
                inputClassName='h-14 text-body placeholder:italic bg-here-gray-50'
                label='User name'
                icon='outlineEnvelope'
                iconSize={25}
              />
              <Input
                value={password}
                onChange={handlePasswordChange}
                type='password'
                placeholder='Enter your password'
                className='mt-[1.25rem] w-full'
                inputClassName='h-14 text-body placeholder:italic bg-here-gray-50'
                label='Password'
                icon='unlock'
                iconSize={24}
              />
              <Clickable className='mt-4' onClick={() => {}}>
                <Typography
                  type='body'
                  className='leading-[1.6em] font-light text-landing-gray_10'
                >
                  Forgot Password ?
                </Typography>
              </Clickable>
              <Button
                className='mt-12 w-full'
                variant='primary'
                onClick={() =>
                  !loginUser.isLoading ? handleLoginUser() : {}
                }
              >
                <Typography type='button'>
                  {loginUser.isLoading ? 'Login...' : 'Login'}
                </Typography>
              </Button>
            </div>
            <Typography
              type='light-italic'
              className='text-landing-gray_10'
            >
              If you don’t have an account register, you can{' '}
              <Link href='#' className='no-underline'>
                Register here!
              </Link>
            </Typography>
          </div>
        </div>
      </div>
      {/* <div className='p-4 w-full h-full bg-white rounded-lg'>
        <h2 className='mb-4'>Login</h2>
        <Input
          value={username}
          onChange={handleUsernameChange}
          type='text'
          placeholder='Enter Username'
          className='mb-4 md:w-[300px] w-full'
        />

        <Input
          value={password}
          onChange={handlePasswordChange}
          type='password'
          placeholder='Enter Password'
        />
        <div
          className={`mt-4 cursor-pointer ${
            registerUser.isLoading ? 'bg-slate-600' : 'bg-blue-600'
          } px-4 py-2 rounded-md text-white flex justify-center items-center`}
          onClick={() => !registerUser.isLoading && handleLoginUser()}
        >
          <p className='text-sm'>
            {registerUser.isLoading ? 'Loading...' : 'Login'}
          </p>
        </div>
      </div> */}
    </Modal>
  )
}

export default LoginModal
