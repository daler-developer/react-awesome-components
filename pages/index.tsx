import { useEffect, useState } from 'react'
import CircularProgress from '../components/circular-progress/CircularProgress'
import Collapse from '../components/collapse/Collapse'
import DatePicker from '../components/date-picker/DatePicker'

export default () => {
  return (
    <div className='p-20'>
      <Collapse>
        <Collapse.Item header='Header 1'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
          assumenda, suscipit quam possimus at harum voluptatem. Nam quaerat
          esse eos maxime quis numquam minus distinctio sint delectus, tenetur
          ducimus debitis. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quas odio dicta rerum ab reprehenderit corporis laudantium nam.
          Natus officiis voluptatum nesciunt pariatur, et vero deserunt sequi
          voluptatem consequatur perferendis laudantium.
        </Collapse.Item>
        <Collapse.Item header='Header 2'>
          Hello World my name is Aziz
        </Collapse.Item>
        <Collapse.Item header='Header 3'>
          Hello World my name is Zarina
        </Collapse.Item>
      </Collapse>
    </div>
  )
}
