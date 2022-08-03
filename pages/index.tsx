import { useEffect, useState } from 'react'
import CircularProgress from '../components/circular-progress/CircularProgress'
import DatePicker from '../components/date-picker/DatePicker'

export default () => {
  const [date, setDate] = useState<string | null>(null)

  return (
    <div className='p-20'>
      <DatePicker onChange={(date) => {}} />
    </div>
  )
}
