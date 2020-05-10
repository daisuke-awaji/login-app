import React from 'react'
export const toClicable = (Icon: any, handleClick: any) => {
  return (
    <span style={{ cursor: 'pointer' }} onClick={handleClick}>
      <Icon />
    </span>
  )
}
