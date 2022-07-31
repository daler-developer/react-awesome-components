import { ReactElement } from 'react'
import cn from 'classnames'

interface IProps {
  children: ReactElement
  count: number
}

export default ({ children, count }: IProps) => {
  return (
    <div className='inline-block relative' role='badge'>
      {children}

      <div
        className={cn(
          'w-5 h-5 border-2 border-white rounded-[50%] absolute bottom-full left-full bg-red-500 flex items-center justify-center text-[10px] text-white translate-x-[-50%] translate-y-[50%]'
        )}
      >
        {count}
      </div>
    </div>
  )
}
