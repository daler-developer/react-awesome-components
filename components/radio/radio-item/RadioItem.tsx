import cn from 'classnames'
import { useContext } from 'react'
import { RadioContext } from '../radio-group/RadioGroup'

interface IProps {
  children: string
  value: string
}

export default ({ children, value }: IProps) => {
  const { activeItem, changeActiveItem } = useContext(RadioContext)

  const handleClick = () => {
    changeActiveItem(value)
  }

  return (
    <div
      role='radio-item'
      className={cn('flex items-center gap-[4px] cursor-pointer select-none')}
      onClick={handleClick}
    >
      <div
        className={cn(
          'w-[16px] h-[16px] flex items-center justify-center border border-gray-500 rounded-[50%]',
          {
            'border-blue-600': activeItem === value,
          }
        )}
      >
        <div
          role='radio-item-dot'
          className={cn('w-[8px] h-[8px] rounded-[50%] transition-all', {
            'bg-blue-600': activeItem === value,
          })}
        ></div>
      </div>
      {children}
    </div>
  )
}
