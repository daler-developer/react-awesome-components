import cn from 'classnames'
import { forwardRef, Ref } from 'react'

interface IProps {
  label: string
  name: string
  onClick: (tabName: string) => void
  isActive: boolean
}

export default forwardRef(
  ({ isActive, name, label, onClick }: IProps, ref: Ref<any>) => {
    return (
      <div
        role='tab'
        ref={ref}
        className={cn('text-gray-500 cursor-pointer select-none py-2', {
          'text-blue-700': isActive,
        })}
        onClick={() => onClick(name)}
      >
        {label}
      </div>
    )
  }
)
