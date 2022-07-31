import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pagination from './Pagination'

describe('<Pagination />', () => {
  test('should render correctly', () => {
    render(<Pagination currentPage={3} onChange={() => {}} totalPages={20} />)

    expect(screen.queryByRole('pagination')).toBeInTheDocument()
  })

  test("'onChange' callback should be called when needed", async () => {
    const user = userEvent.setup()

    const onChange = jest.fn()

    render(<Pagination currentPage={3} onChange={onChange} totalPages={20} />)

    await user.click(screen.getByRole('pagination-prev-btn'))
    await user.click(screen.getByRole('pagination-next-btn'))

    expect(onChange).toBeCalledTimes(2)
  })

  test('prev and next buttons should change currentPage correctly', async () => {
    const user = userEvent.setup()

    const onChange = jest.fn()

    render(<Pagination currentPage={3} onChange={onChange} totalPages={20} />)

    await user.click(screen.getByRole('pagination-prev-btn'))

    expect(onChange.mock.calls[0][0]).toEqual(2)

    await user.click(screen.getByRole('pagination-next-btn'))

    expect(onChange.mock.calls[1][0]).toEqual(4)
  })

  test('page items should change currentPage correctly', async () => {
    const user = userEvent.setup()

    const onChange = jest.fn()

    render(<Pagination currentPage={3} onChange={onChange} totalPages={10} />)

    await user.click(screen.getByRole('pagination-item-1'))
    await user.click(screen.getByRole('pagination-item-4'))
    await user.click(screen.getByRole('pagination-item-10'))

    expect(onChange.mock.calls[0][0]).toEqual(1)
    expect(onChange.mock.calls[1][0]).toEqual(4)
    expect(onChange.mock.calls[2][0]).toEqual(10)
  })
})
