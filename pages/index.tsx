import { useEffect, useState } from 'react'
import LinearProgress from '../components/linear-progress/LinearProgress'

export default () => {
  const [percent, setPercent] = useState(10)

  return (
    <div className='p-20'>
      <LinearProgress status='active' percent={percent} showInfo={true} />
    </div>
  )
}
