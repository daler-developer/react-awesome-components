import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { XIcon, CheckIcon } from '@heroicons/react/solid'

interface IProps {
  percent: number
  status?: 'normal' | 'exception' | 'success'
}

export default ({ percent, status = 'normal' }: IProps) => {
  if (percent === 100) {
    status = 'success'
  }

  const [strokeDasharray, setStrokeDasharray] =
    useState<`${number} ${number}`>('0 10000')

  const circleRef = useRef<SVGCircleElement>(null!)

  useEffect(() => {
    const circleLength = 2 * 3.14 * circleRef.current.r?.baseVal.value

    setStrokeDasharray(
      `${Math.floor((circleLength / 100) * percent)} ${
        circleLength - Math.floor((circleLength / 100) * percent)
      }`
    )
  }, [percent])

  return (
    <div
      className={cn('w-[150px] h-[150px] relative')}
      role='circular-progress'
    >
      <div
        className={cn(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        )}
      >
        {status === 'normal' ? (
          <div className={cn('text-[30px]')}>{percent}%</div>
        ) : status === 'success' ? (
          <CheckIcon
            role='check-icon'
            className='text-green-600 w-[50px] h-[50px]'
          />
        ) : (
          status === 'exception' && (
            <XIcon role='x-icon' className='text-red-500 w-[50px] h-[50px]' />
          )
        )}
      </div>

      <svg width='100%' height='100%' className=''>
        <circle
          r='45%'
          cx='50%'
          cy='50%'
          className={cn('stroke-gray-100')}
          style={{
            transition: 'all .2s linear',
            fill: 'transparent',
            strokeWidth: '7px',
          }}
        />
        <circle
          role='circular-progress-line'
          ref={circleRef}
          r='45%'
          cx='50%'
          cy='50%'
          className={cn({
            'stroke-blue-500': status === 'normal',
            'stroke-red-500': status === 'exception',
            'stroke-green-600': status === 'success',
          })}
          style={{
            transition: 'all .2s linear',
            fill: 'transparent',
            strokeLinecap: 'round',
            strokeDasharray,
            strokeWidth: '7px',
            transformOrigin: '50% 50%',
            transform: 'rotate(-90deg)',
          }}
        />
      </svg>
    </div>
  )
}
