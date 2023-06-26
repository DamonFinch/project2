import React from 'react'
import styles from './GradientAnimation.module.css'

function GradientAnimation() {
  return (
    <div
      className={`z-[1] w-[21.875rem] h-[21.875rem] md:w-[28.125rem] md:h-[28.125rem] lg:w-[40.25rem] lg:h-[40.25rem] absolute -right-[13.25rem] top-[28%] md:top-[20%] lg:top-[11%]`}
    >
      <div
        className={`z-[2] w-[21.875rem] h-[21.875rem] md:w-[28.125rem] md:h-[28.125rem] lg:w-[40.25rem] lg:h-[40.25rem] absolute -right-[13.25rem] top-[28%] md:top-[20%] lg:top-[15%] ${styles.gradient}`}
      />
    </div>
  )
}

export default GradientAnimation
