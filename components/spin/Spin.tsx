import cn from 'classnames'

interface IProps {
  size?: 'sm' | 'md' | 'lg'
}

export default ({ size = 'md' }: IProps) => {
  return (
    <div
      role='spin'
      className={cn('inline-grid grid-cols-2 grid-row-2 animate-spin', {
        'gap-[6px]': size === 'lg',
        'gap-[5px]': size === 'md',
        'gap-[4px]': size === 'sm',
      })}
    >
      <div
        role='spin-dot'
        className={cn(
          'rounded-[50%] bg-blue-300 animate-spin-first-dot-pulse-color',
          {
            'w-[14px] h-[14px]': size === 'lg',
            'w-[9px] h-[9px]': size === 'md',
            'w-[6px] h-[6px]': size === 'sm',
          }
        )}
      />
      <div
        role='spin-dot'
        className={cn(
          'rounded-[50%] bg-blue-300 animate-spin-second-dot-pulse-color',
          {
            'w-[14px] h-[14px]': size === 'lg',
            'w-[9px] h-[9px]': size === 'md',
            'w-[6px] h-[6px]': size === 'sm',
          }
        )}
      />
      <div
        role='spin-dot'
        className={cn(
          'rounded-[50%] bg-blue-300 animate-spin-third-dot-pulse-color',
          {
            'w-[14px] h-[14px]': size === 'lg',
            'w-[9px] h-[9px]': size === 'md',
            'w-[6px] h-[6px]': size === 'sm',
          }
        )}
      />
      <div
        role='spin-dot'
        className={cn(
          'rounded-[50%] bg-blue-300 animate-spin-fifth-dot-pulse-color',
          {
            'w-[14px] h-[14px]': size === 'lg',
            'w-[9px] h-[9px]': size === 'md',
            'w-[6px] h-[6px]': size === 'sm',
          }
        )}
      />
    </div>
  )
}
