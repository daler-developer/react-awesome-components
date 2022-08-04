import { createContext, ReactElement } from 'react'

interface IProps {
  children: ReactElement[]
  value: string
  onChange: (value: string) => void
}

export const RadioContext = createContext<{
  activeItem: string
  changeActiveItem: (to: string) => void
}>(null!)

export default ({ children, value, onChange }: IProps) => {
  const changeActiveItem = (to: string) => {
    onChange(to)
  }

  const contextValue = {
    activeItem: value,
    changeActiveItem,
  }

  return (
    <RadioContext.Provider value={contextValue}>
      <div role='radio-group' className='flex item-center flex-wrap gap-[10px]'>
        {children}
      </div>
    </RadioContext.Provider>
  )
}
