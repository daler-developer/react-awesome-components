import { useEffect, useState } from 'react'
import Pagination from '../components/pagination/Pagination'

export default () => {
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    console.log(page)
  })

  return (
    <div className='m-4'>
      <Pagination
        currentPage={page}
        totalPages={3}
        onChange={(to) => setPage(to)}
      />
    </div>
  )
}
