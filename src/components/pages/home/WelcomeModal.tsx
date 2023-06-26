import Modal from 'components/core/Modal'
import React from 'react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { toggleIsWelcomeModalVisible } from 'store/slices/auth.slice'
import CheckCircle from 'assets/check-circle.png'
import Image from 'next/image'
import Button from 'components/core/Button'
import Typography from 'components/core/Typography'

interface WelcomeModalProps {
  isWelcomeVisible: boolean
  toggleIsWelcomeVisible: () => void
}

const WelcomeModal = ({
  isWelcomeVisible,
  toggleIsWelcomeVisible
}: WelcomeModalProps) => {
  const dispatch = useAppDispatch()
  const isGlobalModalVisible = useAppSelector(
    state => state.auth && state.auth.isWelcomeModalVisible
  )
  const { balance } = useAppSelector(
    state => state.auth && state.auth
  )
  const handleCloseModal = () => {
    isGlobalModalVisible &&
      dispatch(toggleIsWelcomeModalVisible(false))
    isWelcomeVisible && toggleIsWelcomeVisible()
  }
  return (
    <Modal
      isVisible={isWelcomeVisible || isGlobalModalVisible}
      onClose={handleCloseModal}
      className='bg-[#53389ea3] backdrop-blur-[2px]'
    >
      <div className='w-[300px] sm:w-[500px] flex flex-col items-center justify-center gap-6 p-8'>
        <Image src={CheckCircle} alt='checl' height={46} width={46} />
        <p className='text-[24px] font-[500] leading-[33px] text-[#667085]'>
          Welcome to Here!
        </p>
        <p className='text-base font-[400] text-[#858D9D] leading-[160%]'>
          You have received {balance} Micro tokens to get started.
        </p>
        <Button
          type='submit'
          size='small'
          outlined={false}
          className='py-1 px-6 rounded-lg w-full h-10 sm:h-12'
          onClick={handleCloseModal}
        >
          <Typography
            type='button'
            className='text-baseWhite !text-base leading-[1.2rem] tracking-medium font-medium'
          >
            Continue
          </Typography>
        </Button>
      </div>
    </Modal>
  )
}

export default WelcomeModal
