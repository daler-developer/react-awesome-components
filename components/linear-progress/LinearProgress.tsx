import cn from 'classnames'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CheckIcon, XIcon } from '@heroicons/react/solid'

interface IProps {
  percent: number
  showInfo?: boolean
  status?: 'active' | 'exception' | 'success' | 'normal'
}

export default ({ showInfo = false, percent, status = 'normal' }: IProps) => {
  const [progressWidth, setProgressWidth] = useState('0px')

  if (percent === 100) {
    status = 'success'
  }

  const progressWrapperRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    setProgressWidth(
      `${
        (progressWrapperRef.current.getBoundingClientRect().width / 100) *
        percent
      }px`
    )
  }, [percent])

  return (
    <div className={cn('flex items-center gap-[6px]')} role='linear-progress'>
      <div
        ref={progressWrapperRef}
        className={cn(
          `h-[7px] flex-[1_0_0] overflow-hidden rounded-[10px] bg-gray-100`
        )}
      >
        <div
          style={{ width: progressWidth }}
          className={cn('h-full transition-all', {
            'bg-red-600': status === 'exception',
            'bg-green-600': status === 'success',
            'bg-blue-400': status === 'active' || status === 'normal',
          })}
        >
          {status === 'active' && (
            <div
              className={cn(
                'w-[100%] h-full bg-[#ffffff21] animate-progress-active-line'
              )}
            />
          )}
        </div>
      </div>
      {showInfo && (
        <div role='linear-progress-info'>
          {status === 'exception' ? (
            <div
              className={cn(
                'w-[15px] h-[15px] flex items-center justify-center rounded-[50%] bg-red-600'
              )}
            >
              <XIcon className='w-[12px] h-[12px] text-white' />
            </div>
          ) : status === 'success' ? (
            <div
              className={cn(
                'w-[15px] h-[15px] flex items-center justify-center rounded-[50%] bg-green-500'
              )}
            >
              <CheckIcon className='w-[12px] h-[12px] text-white' />
            </div>
          ) : (
            <div className={cn('')}>{percent}%</div>
          )}
        </div>
      )}
    </div>
  )
}
