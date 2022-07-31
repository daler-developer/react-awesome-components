import { useState } from 'react'
import Badge from '../components/badge/Badge'

export default () => {
  const [number, setNumber] = useState(15)

  const handleChange = (value: number) => {
    setNumber(value)
  }

  return (
    <div className='m-4'>
      <Badge count={10}>
        <div className='bg-gray-400 w-16 h-16'></div>
      </Badge>
    </div>
  )
}
