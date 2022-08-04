import cn from 'classnames'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { ReactNode, useEffect, useRef, useState } from 'react'

interface IProps {
  header: string
  children: ReactNode
  isDisabled?: boolean
}

export default ({ children, header, isDisabled = false }: IProps) => {
  const [isCalculatingHeight, setIsCalculatingHeight] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [contentHeight, setContentHeight] = useState<`${number}px`>('0px')

  const contentRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    if (isCalculatingHeight) {
      setContentHeight(
        `${contentRef.current!.getBoundingClientRect().height}px`
      )
      setIsCalculatingHeight(false)
    }
  }, [isCalculatingHeight])

  const handleClick = () => {
    if (!isDisabled) {
      setIsOpen((prev) => !prev)
    }
  }

  return (
    <div className={cn('text-[14px]')} role='collapse-item'>
      <div
        role='collapse-item-header'
        onClick={handleClick}
        className={cn(
          'flex items-center gap-[10px] p-[10px] border border-gray-200 bg-gray-50 select-none',
          {
            'cursor-pointer': !isDisabled,
          }
        )}
      >
        <ChevronRightIcon
          className={cn('w-[20px] h-[20px] transition-all text-gray-700', {
            'text-gray-300': isDisabled,
            'text-gray-700': !isDisabled,
          })}
          style={{
            transformOrigin: '50% 50%',
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
        />
        <span
          className={cn({
            'text-gray-400': isDisabled,
          })}
        >
          {header}
        </span>
      </div>
      {/* Content */}
      <div
        role='collapse-item-content'
        ref={contentRef}
        className={cn(
          'transition-all overflow-hidden border border-gray-200 border-t-0 p-[10px]'
        )}
        style={
          isCalculatingHeight
            ? {}
            : isOpen
            ? {
                height: contentHeight,
              }
            : {
                height: '0px',
                paddingTop: '0',
                paddingBottom: '0',
                borderBottom: '0',
              }
        }
      >
        {children}
      </div>
    </div>
  )
}
