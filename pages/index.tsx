import { useState } from 'react'
import Popover from '../components/popover/Popover'

export default () => {
  const [value, setValue] = useState(100)

  return (
    <div className='p-[500px]'>
      <Popover
        position='bottom'
        title='Hello World'
        content={<div>hello world</div>}
      >
        <button className='p-[40px] bg-blue-500'>click here</button>
      </Popover>
    </div>
  )
}
