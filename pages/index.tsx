import { useState } from 'react'
import Checkbox from '../components/ui/checkbox/Checkbox'
import InputNumber from '../components/ui/input-number/InputNumber'
import Switch from '../components/ui/switch/Switch'

export default () => {
  const [number, setNumber] = useState(15)

  const handleChange = (value: number) => {
    setNumber(value)
  }

  return (
    <div className='m-4'>
      {/* <InputNumber
        step={1}
        initialValue={number}
        min={1}
        max={10}
        onChange={handleChange}
      /> */}
      {/* <Switch checked={checked} onChange={(to) => setChecked(to)} /> */}
      {/* <Checkbox checked={checked} onChange={(to) => setChecked(to)} /> */}
    </div>
  )
}
