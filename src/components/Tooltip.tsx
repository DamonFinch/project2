import React, { PropsWithChildren } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

interface Props {
  id: string
  message: string
  link?: string
  className?: string
}

const Tooltip = ({
  children,
  link,
  message,
  id,
  className
}: PropsWithChildren<Props>) => {
  return (
    <div
      className={className}
      data-tooltip-id={id}
      data-tooltip-content={message}
    >
      {children}
      <ReactTooltip id={id} />
    </div>
  )
}

export default Tooltip
