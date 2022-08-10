import cn from 'classnames'
import {
  cloneElement,
  MouseEvent,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import useClickOutside from '../../hooks/useClickOutside'

interface IProps {
  title: string
  children: ReactElement
  content: ReactNode
  position?: 'bottom' | 'left' | 'right' | 'top'
}

export default ({ title, children, content, position = 'top' }: IProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [popoverStyles, setPopoverStyles] = useState({
    left: -100,
    top: -100,
  })

  const childRef = useRef<HTMLElement>(null!)
  const popoverRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    const childClientRect = childRef.current.getBoundingClientRect()
    const popoverClientRect = popoverRef.current.getBoundingClientRect()

    if (position === 'bottom') {
      setPopoverStyles({
        top: childRef.current.offsetTop + childClientRect.height,
        left:
          childRef.current.offsetLeft -
          (popoverClientRect.width - childClientRect.width) / 2,
      })
    } else if (position === 'top') {
      setPopoverStyles({
        top: childRef.current.offsetTop - popoverClientRect.height,
        left:
          childRef.current.offsetLeft -
          (popoverClientRect.width - childClientRect.width) / 2,
      })
    } else if (position === 'left') {
      setPopoverStyles({
        top:
          childRef.current.offsetTop +
          (childClientRect.height - popoverClientRect.height) / 2,
        left: childRef.current.offsetLeft - popoverClientRect.width,
      })
    } else if (position === 'right') {
      setPopoverStyles({
        top:
          childRef.current.offsetTop +
          (childClientRect.height - popoverClientRect.height) / 2,
        left: childRef.current.offsetLeft + childClientRect.width,
      })
    }
  }, [])

  const handleChildrenMouseEnter = () => {
    setIsOpen(true)
  }

  const handleChildrenMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    if (e.relatedTarget && (!e.relatedTarget as any).dataset.popup) {
      setIsOpen(false)
    }
  }

  return (
    <>
      {cloneElement(children, {
        ref: childRef,
        onMouseEnter: handleChildrenMouseEnter,
        onMouseLeave: handleChildrenMouseLeave,
      })}

      <div
        role='popover'
        data-popup
        ref={popoverRef}
        className={cn('absolute bg-transparent transition-all', {
          'invisible opacity-0': !isOpen,
          'pb-[15px]': position === 'top',
          'pt-[15px]': position === 'bottom',
          'pr-[15px]': position === 'left',
          'pl-[15px]': position === 'right',
        })}
        style={{
          left: `${popoverStyles.left}px`,
          top: `${popoverStyles.top}px`,
        }}
      >
        <div
          onMouseLeave={() => setIsOpen(false)}
          className={cn('bg-white relative shadow-3xl rounded-[5px] w-[150px]')}
        >
          <div
            className={cn('absolute w-[14px] h-[14px] rotate-45 bg-white', {
              'top-[100%] left-[50%] -translate-y-1/2 -translate-x-1/2':
                position === 'top',
              'bottom-[100%] left-[50%] translate-y-1/2 -translate-x-1/2':
                position === 'bottom',
              'left-[100%] top-[50%] -translate-y-1/2 -translate-x-1/2':
                position === 'left',
              'right-[100%] top-[50%] -translate-y-1/2 translate-x-1/2':
                position === 'right',
            })}
          ></div>

          <div
            className={cn(
              'p-[3px_8px] font-bold text-[12px] border-b border-blue-200'
            )}
          >
            {title}
          </div>

          <div className={cn('p-[8px]')}>{content}</div>
        </div>
      </div>
    </>
  )
}
