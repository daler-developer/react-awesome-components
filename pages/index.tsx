import { useEffect, useState } from 'react'
import Radio from '../components/radio'

export default () => {
  const [value, setValue] = useState<string>('daler')

  useEffect(() => {
    console.log(value)
  }, [value])

  return (
    <div className='p-20'>
      <Radio.Group value={value} onChange={(to) => setValue(to)}>
        <Radio.Item value='daler'>Daler</Radio.Item>
        <Radio.Item value='aziz'>Aziz</Radio.Item>
      </Radio.Group>
    </div>
  )
}
