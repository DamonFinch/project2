import React from 'react'

import Experience from './Experience'
import Footer from './Footer'
import GradientAnimation from './GradientAnimation'

function BottomSection() {
  return (
    <div className='relative overflow-hidden'>
      <Experience />
      <GradientAnimation />
      <Footer />
    </div>
  )
}

export default BottomSection
