import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/solid'
import dayjs, { Dayjs } from 'dayjs'
import Cell from './cell/Cell'

interface IProps {}

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

export default ({}: IProps) => {
  const today = useRef(dayjs())

  const [inputValue, setInputValue] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [date, setDate] = useState<Dayjs | null>(null)
  const [page, setPage] = useState({
    year: today.current.year(),
    month: today.current.month(),
  })

  useEffect(() => {
    if (date) {
      setInputValue(date.format('YYYY-MM-DD'))
    }
  }, [date])

  const isCurrentMonthPageOpened =
    today.current.year() === page.year && today.current.month() === page.month

  const handleCellClick = (date: number) => {
    setDate(dayjs().year(page.year).month(page.month).date(date))
  }

  const handleClickToday = () => {
    setDate(today.current)
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
      switchToPrevYear()
      // setPage({ ...page, month: 11 })
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
      // setPage({ ...page, month: 0 })
    } else {
      setPage({
        ...page,
        month: page.month + 1,
      })
    }
  }

  return (
    <div
      className={cn('relative select-none')}
      onClick={() => setIsPopupOpen(true)}
    >
      <div className={cn('flex h-[30px] w-[150px] border border-gray-400')}>
        <input
          className={cn('min-w-0 px-[5px] outline-none')}
          placeholder='Select date'
          value={inputValue}
          type='text'
        />
      </div>
      {/* Popup */}
      <div
        className={cn(
          'absolute top-full left-0 rounded-sm shadow-lg transition-all',
          {
            'opacity-0 scale-y-0 origin-top': !isPopupOpen,
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
          <div className='text-black font-bold'>
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
