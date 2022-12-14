import { forwardRef } from 'react'

interface IProps {
  children: any
}

export default forwardRef(({ children }: IProps, ref: any) => {
  return (
    <div ref={ref} role='carousel-slide'>
      {children}
    </div>
  )
})
