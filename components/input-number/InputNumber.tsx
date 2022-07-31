import cn from 'classnames'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/solid'
import { FormEvent, useMemo, useState } from 'react'

interface IProps {
  min: number
  max: number
  onChange: (value: number) => void
  step: number
  initialValue: number
}

const allDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export default ({ min, max, onChange, initialValue, step }: IProps) => {
  const [value, setValue] = useState(String(initialValue))

  const validatedValue = useMemo(() => {
    let v: any

    v = value
      .split('')
      .filter((char) => allDigits.includes(char))
      .join('')

    if (!v) {
      v = min

      return v as number
    }

    v = Number(v)

    if (Number.isNaN(v)) {
      v = 1

      return v as number
    }

    if (v < min) {
      v = min

      return v as number
    }

    if (v > max) {
      v = max

      return v as number
    }

    return v as number
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
    if (validatedValue < max) {
      setValue(String(validatedValue + step))
      onChange(validatedValue + step)
    }
  }

  const handleDecrease = () => {
    if (validatedValue > min) {
      setValue(String(validatedValue - step))
      onChange(validatedValue - step)
    }
  }

  return (
    <div
      className={cn(
        'group h-8 w-32 flex border border-gray-300 hover:border-blue-300 cursor-pointer transition-all rounded-sm',
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
