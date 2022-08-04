import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Cell from './Cell'

describe('<Cell />', () => {
  test('should render correctly', () => {
    render(<Cell type='date'>2</Cell>)

    expect(screen.queryByRole('date-picker-cell')).toBeInTheDocument()
  })

  test("'onClick' callback should be called when clicking on a cell", async () => {
    const user = userEvent.setup()

    const handleClick = jest.fn()

    render(
      <Cell type='date' onClick={handleClick}>
        2
      </Cell>
    )

    expect(handleClick).toBeCalledTimes(0)

    await user.click(screen.getByRole('date-picker-cell'))
    await user.click(screen.getByRole('date-picker-cell'))

    expect(handleClick).toBeCalledTimes(2)
  })

  test("'children' prop should rendered", () => {
    render(<Cell type='date'>23</Cell>)

    expect(screen.getByRole('date-picker-cell')).toHaveTextContent('23')
  })

  test("should be outlined when 'isOutlined' prop is equal to 'true'", () => {
    const { rerender } = render(
      <Cell type='date' isOutlined={false}>
        23
      </Cell>
    )

    expect(screen.getByRole('date-picker-cell')).not.toHaveClass(
      'border border-blue-500'
    )

    rerender(
      <Cell type='date' isOutlined={true}>
        23
      </Cell>
    )

    expect(screen.getByRole('date-picker-cell')).toHaveClass(
      'border border-blue-500'
    )
  })
})
