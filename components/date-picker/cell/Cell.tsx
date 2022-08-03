import cn from 'classnames'

interface IProps {
  children: string | number
  isOutlined?: boolean
  isFilled?: boolean
  type: 'date' | 'day-of-the-week'
  onClick?: (date: number) => void
}

export default ({
  children,
  isOutlined = false,
  type,
  onClick,
  isFilled = false,
}: IProps) => {
  return (
    <div
      role='date-picker-cell'
      {...(onClick && { onClick: () => onClick(children as number) })}
      className={cn(
        'w-[25px] h-[25px] rounded-[3px] flex items-center justify-center',
        type === 'date' && {
          'cursor-pointer': true,
          'border border-blue-500': isOutlined,
          'hover:bg-gray-100': !isFilled,
          'text-white bg-blue-500': isFilled,
        }
      )}
    >
      {children}
    </div>
  )
}
