import React from 'react'
import Modal from 'components/Modal'

interface IVideoModal {
  isVisible: boolean
  toggleVisible: () => void
}

function VideoModal({ isVisible, toggleVisible }: IVideoModal) {
  const videoUrl =
    'https://player.vimeo.com/video/811264270?autoplay=1'

  return (
    <Modal
      isVisible={isVisible}
      toggleVisible={toggleVisible}
      className='bg-primary bg-opacity-30 backdrop-blur-xs bg-blend-color-burn'
    >
      {isVisible && (
        <div className='w-[80vw] h-[80vh] bg-black'>
          <iframe
            width='100%'
            height='100%'
            src={videoUrl}
            title='Landing video player'
            allow='autoplay; fullscreen; picture-in-picture'
            allowFullScreen
          />
        </div>
      )}
    </Modal>
  )
}

export default VideoModal
