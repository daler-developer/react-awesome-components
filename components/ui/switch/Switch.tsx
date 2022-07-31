import cn from 'classnames'

interface IProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

export default ({ checked, onChange }: IProps) => {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={cn(
        'h-6 w-10 absolute rounded-2xl p-[2.4px] cursor-pointer',
        {
          'bg-green-600': checked,
          'bg-gray-400': !checked
        }
      )}
    >
      <div
        className={cn(
          'h-full aspect-square bg-white rounded-[50%] relative transition-all',
          {
            'left-full translate-x-[-100%]': checked,
            'left-0': !checked
          }
        )}
      >

      </div>
    </div>
  )
}
