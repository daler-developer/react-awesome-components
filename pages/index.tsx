import { useEffect, useState } from 'react'
import Pagination from '../components/pagination/Pagination'
import Tabs from '../components/tabs/Tabs'

export default () => {
  const [tab, setTab] = useState('first')

  return (
    <div className='p-20'>
      <Tabs
        initialActiveTab={tab}
        onChange={(tab) => setTab(tab)}
        align='right'
        items={[
          { label: 'First', name: 'first' },
          { label: 'Second', name: 'second' },
          { label: 'Third', name: 'third' },
        ]}
      />
    </div>
  )
}
