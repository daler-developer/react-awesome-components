import { useEffect, useState } from 'react'
import CircularProgress from '../components/circular-progress/CircularProgress'

export default () => {
  const [percent, setPercent] = useState(90)

  return (
    <div className='p-20'>
      <CircularProgress percent={percent} status='exception' />
    </div>
  )
}
