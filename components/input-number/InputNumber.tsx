import cn from 'classnames'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/solid'
import { FormEvent, isValidElement, useEffect, useMemo, useState } from 'react'

interface IProps {
  min: number
  max: number
  onChange: (value: number) => void
  step?: number
  initialValue: number
}

export default ({ min, max, onChange, initialValue, step = 1 }: IProps) => {
  const [value, setValue] = useState(String(initialValue))

  const validatedValue = useMemo(() => {
    let converted = Number(value)

    if (Number.isNaN(converted)) {
      return initialValue
    }
    if (converted < min) {
      return min
    }
    if (converted > max) {
      return max
    }

    return initialValue
  }, [value])

  const isValueValid = useMemo(
    () => value === String(validatedValue),
    [value, validatedValue]
  )

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  const handleBlur = () => {
    setValue(String(validatedValue))
    onChange(validatedValue)
  }

  const handleIncrease = () => {
    const newValue = validatedValue + step

    if (newValue > max) {
      return
    }

    setValue(String(newValue))
    onChange(newValue)
  }

  const handleDecrease = () => {
    const newValue = validatedValue - step

    if (newValue < min) {
      return
    }

    setValue(String(newValue))
    onChange(newValue)
  }

  return (
    <div
      className={cn(
        'group h-8 w-32 flex border border-gray-300  cursor-pointer transition-all rounded-sm',
        {
          'hover:border-blue-300': isValueValid,
        },
        {
          'border-red-600': !isValueValid,
        }
      )}
    >
      <input
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={cn('flex-grow min-w-0 outline-none px-2 text-sm')}
        type='text'
      />

      <div className='w-10 border-l opacity-0 border-gray-300 text-gray-600 flex flex-col group-hover:opacity-100 transition-all'>
        <button
          onClick={handleIncrease}
          className={cn('peer flex items-center justify-center h-1/2')}
        >
          <ArrowUpIcon className='w-2 h-2' />
        </button>
        <button
          onClick={handleDecrease}
          className={cn(
            'peer flex items-center justify-center h-1/2 border-t border-gray-300'
          )}
        >
          <ArrowDownIcon className='w-2 h-2' />
        </button>
      </div>
    </div>
  )
}
