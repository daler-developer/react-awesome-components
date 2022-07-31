import cn from 'classnames'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

interface IProps {
  currentPage: number
  totalPages: number
  onChange: (to: number) => void
}

export default ({ currentPage, totalPages, onChange }: IProps) => {
  const isPrevBtnDisabled = currentPage === 1
  const isNextBtnDisabled = currentPage === totalPages

  const changePage = (to: number) => {
    onChange(to)
  }

  const pagesToRenderInTheMiddle = []

  for (let i = currentPage - 2; i < currentPage + 2 + 1; i++) {
    if (i > 1 && i < totalPages) {
      pagesToRenderInTheMiddle.push(i)
    }
  }

  return (
    <div className={cn('group flex gap-2 h-7')} role='pagination'>
      <button
        role='pagination-prev-btn'
        onClick={() => changePage(currentPage - 1)}
        disabled={isPrevBtnDisabled}
        className='hover:text-blue-500 text-gray-500 flex items-center justify-center h-full aspect-square border border-gray-400 hover:border-blue-500 rounded-[3px] disabled:border-gray-300 disabled:text-gray-400'
      >
        <ChevronLeftIcon className='h-5 w-5' />
      </button>

      <button
        role={`pagination-item-${1}`}
        onClick={() => changePage(1)}
        className={cn(
          'h-full aspect-square rounded-[3px] border border-gray-400 text-[12px] flex items-center justify-center hover:border-blue-600 hover:text-blue-600',
          {
            'border-blue-600 text-blue-600 font-bold': currentPage === 1,
          }
        )}
      >
        1
      </button>

      {pagesToRenderInTheMiddle[0] && pagesToRenderInTheMiddle[0] !== 2 && (
        <div className='h-full aspect-square flex items-center justify-center gap-[4px]'>
          <div className='rounded-[50%] basis-[4px] h-[4px] bg-gray-500' />
          <div className='rounded-[50%] basis-[4px] h-[4px] bg-gray-500' />
          <div className='rounded-[50%] basis-[4px] h-[4px] bg-gray-500' />
        </div>
      )}

      {pagesToRenderInTheMiddle.map((page) => (
        <button
          role={`pagination-item-${page}`}
          key={page}
          onClick={() => changePage(page)}
          className={cn(
            'h-full aspect-square rounded-[3px] border border-gray-400 text-[12px] flex items-center justify-center hover:border-blue-600 hover:text-blue-600',
            {
              'border-blue-600 text-blue-600 font-bold': currentPage === page,
            }
          )}
        >
          {page}
        </button>
      ))}

      {pagesToRenderInTheMiddle[pagesToRenderInTheMiddle.length - 1] &&
        pagesToRenderInTheMiddle[pagesToRenderInTheMiddle.length - 1] !==
          totalPages - 1 && (
          <div className='h-full aspect-square flex items-center justify-center gap-[4px]'>
            <div className='rounded-[50%] basis-[4px] h-[4px] bg-gray-500' />
            <div className='rounded-[50%] basis-[4px] h-[4px] bg-gray-500' />
            <div className='rounded-[50%] basis-[4px] h-[4px] bg-gray-500' />
          </div>
        )}

      {totalPages >= 2 && (
        <button
          role={`pagination-item-${totalPages}`}
          onClick={() => changePage(totalPages)}
          className={cn(
            'h-full aspect-square rounded-[3px] border border-gray-400 text-[12px] flex items-center justify-center hover:border-blue-600 hover:text-blue-600',
            {
              'border-blue-600 text-blue-600 font-bold':
                currentPage === totalPages,
            }
          )}
        >
          {totalPages}
        </button>
      )}

      <button
        role='pagination-next-btn'
        onClick={() => changePage(currentPage + 1)}
        disabled={isNextBtnDisabled}
        className='hover:text-blue-500 text-gray-500 flex items-center justify-center h-full aspect-square border border-gray-400 hover:border-blue-500 rounded-[3px] disabled:border-gray-200 disabled:text-gray-300'
      >
        <ChevronRightIcon className='h-5 w-5' />
      </button>
    </div>
  )
}
