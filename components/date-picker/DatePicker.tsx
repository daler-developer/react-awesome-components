import cn from 'classnames'
import { FormEvent, useEffect, useRef, useState } from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  XCircleIcon,
} from '@heroicons/react/solid'
import { CalendarIcon } from '@heroicons/react/outline'
import dayjs, { Dayjs } from 'dayjs'
import Cell from './cell/Cell'
import useClickOutside from '../../hooks/useClickOutside'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

interface IProps {
  onChange: (date: string | null) => void
}

const months = [
  'Jan',
  'Fab',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const weeks = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

const format = 'YYYY-MM-DD'

export default ({ onChange }: IProps) => {
  const today = useRef(dayjs())
  const rootElRef = useRef<HTMLDivElement>(null!)

  const [inputValue, setInputValue] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [date, setDate] = useState<Dayjs | null>(null)
  const [page, setPage] = useState({
    year: today.current.year(),
    month: today.current.month(),
  })

  useClickOutside(() => {
    setIsPopupOpen(false)
  }, rootElRef)

  useEffect(() => {
    onChange(date ? date.format(format) : null)
  }, [date])

  useEffect(() => {
    if (date) {
      setInputValue(date.format('YYYY-MM-DD'))
    } else if (!date) {
      setInputValue('')
    }
  }, [date])

  useEffect(() => {
    const generatedDate = dayjs(inputValue, 'YYYY-MM-DD', true)

    if (generatedDate.isValid()) {
      setDate(generatedDate)
      setPage({
        ...page,
        year: generatedDate.year(),
        month: generatedDate.month(),
      })
    }
  }, [inputValue])

  const handleInputBlue = () => {
    if (!dayjs(inputValue, format, true).isValid()) {
      if (date) {
        setInputValue(date.format(format))
      } else {
        setInputValue('')
      }
    }
  }

  const isCurrentMonthPageOpened =
    today.current.year() === page.year && today.current.month() === page.month

  const handleCellClick = (date: number) => {
    setDate(dayjs().year(page.year).month(page.month).date(date))
    setIsPopupOpen(false)
  }

  const handleClickToday = () => {
    setDate(today.current)
    setIsPopupOpen(true)
  }

  const handleClearInput = (e: FormEvent<Element>) => {
    e.stopPropagation()

    setDate(null)
    setIsPopupOpen(false)
  }

  const switchToPrevYear = () => {
    setPage({
      ...page,
      year: page.year - 1,
    })
  }

  const switchToNextYear = () => {
    setPage({
      ...page,
      year: page.year + 1,
    })
  }

  const switchToPrevMonth = () => {
    if (page.month === 0) {
      setPage((prev) => ({ ...page, year: prev.year - 1, month: 11 }))
    } else {
      setPage({
        ...page,
        month: page.month - 1,
      })
    }
  }

  const switchToNextMonth = () => {
    if (page.month === 11) {
      switchToNextYear()
      setPage((prev) => ({ ...page, year: page.year - 1, month: 0 }))
    } else {
      setPage({
        ...page,
        month: page.month + 1,
      })
    }
  }

  return (
    <div
      ref={rootElRef}
      onClick={() => !isPopupOpen && setIsPopupOpen(true)}
      className={cn('relative select-none inline-block')}
    >
      <div
        className={cn(
          'flex items-center gap-[5px] px-[8px] h-[30px] w-[150px] border border-gray-400 rounded-[4px]'
        )}
      >
        <input
          className={cn('min-w-0 outline-none text-[14px]')}
          placeholder='Select date'
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          onBlur={handleInputBlue}
          type='text'
        />
        <div
          onClick={(e) => e.stopPropagation()}
          className={cn('group', { 'cursor-pointer': !!date })}
        >
          <CalendarIcon
            className={cn('w-[20px] 1h-[20px] text-gray-500', {
              'group-hover:hidden': !!date,
            })}
          />
          <XCircleIcon
            onClick={handleClearInput}
            className={cn('w-[20px] h-[20px] text-gray-500 hidden', {
              'group-hover:block': !!date,
            })}
          />
        </div>
      </div>
      {/* Popup */}
      <div
        className={cn(
          'absolute top-full left-0 rounded-sm transition-all shadow-2xl w-max',
          {
            'opacity-0 invisible': !isPopupOpen,
          }
        )}
      >
        {/* HEADER */}
        <div className='border-b border-gray-200 p-[13px] flex items-center justify-between text-gray-400'>
          <div className='flex items-center gap-[5px]'>
            <ChevronDoubleLeftIcon
              onClick={switchToPrevYear}
              className='w-[18px] h-[18px] cursor-pointer'
            />
            <ChevronLeftIcon
              onClick={switchToPrevMonth}
              className='w-[18px] h-[18px] cursor-pointer'
            />
          </div>
          <div className='text-black text-[15px] font-bold'>
            {months[page.month]} {page.year}
          </div>
          <div className='flex items-center gap-[5px]'>
            <ChevronRightIcon
              onClick={switchToNextMonth}
              className='w-[18px] h-[18px] cursor-pointer'
            />
            <ChevronDoubleRightIcon
              onClick={switchToNextYear}
              className='w-[18px] h-[18px] cursor-pointer'
            />
          </div>
        </div>
        {/* BODY */}
        <div className={cn('p-[20px]')}>
          {/* Days */}
          <div className={cn('grid grid-cols-7 gap-[10px]')}>
            {weeks.map((week) => (
              <Cell key={week} isOutlined={false} type='day-of-the-week'>
                {week}
              </Cell>
            ))}
            {[
              ...Array(dayjs().year(page.year).month(page.month).daysInMonth()),
            ].map((_, i) => (
              <Cell
                key={i}
                onClick={handleCellClick}
                isOutlined={
                  isCurrentMonthPageOpened && today.current.date() === i + 1
                }
                isFilled={
                  !!(
                    date &&
                    date.year() === page.year &&
                    date.month() === page.month &&
                    date.date() === i + 1
                  )
                }
                type='date'
              >
                {i + 1}
              </Cell>
            ))}
          </div>
        </div>
        {/* Today */}
        <div
          className={cn(
            'border-t border-gray-200 flex items-center justify-center p-[7px]'
          )}
        >
          <span
            onClick={handleClickToday}
            className={cn('text-blue-500 text-[14px] cursor-pointer')}
          >
            Today
          </span>
        </div>
      </div>
    </div>
  )
}
