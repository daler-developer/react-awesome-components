import { CheckIcon } from '@heroicons/react/solid'
import cn from 'classnames'

interface IProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

export default ({ checked, onChange }: IProps) => {
  return (
    <div
      role='checkbox'
      onClick={() => onChange(!checked)}
      className={cn(
        'w-5 h-5 rounded-sm border border-green-600 transition-all flex cursor-pointer items-center justify-center',
        { 'bg-green-600': checked, 'bg-white': !checked }
      )}
    >
      <CheckIcon className={cn('w-4 h-4 text-white')} />
    </div>
  )
}
