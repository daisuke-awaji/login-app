import React from 'react'
import Lottie from 'react-lottie'
import animationData from '../lottie.json'

export const AvatarsAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return <Lottie options={defaultOptions} height={'100%'} width={'100%'} />
}
