import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DatePicker from './DatePicker'
import dayjs from 'dayjs'

const months = [
  'Jan',
  'Fab',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

describe('<DatePicker />', () => {
  test('should render correctly', () => {
    render(<DatePicker onChange={() => {}} />)

    expect(screen.queryByRole('date-picker')).toBeInTheDocument()
  })

  test("'onChange' callback should be called with correct arguments when clicking 'today' button", async () => {
    const user = userEvent.setup()

    const handleChange = jest.fn()

    render(<DatePicker onChange={handleChange} />)

    expect(handleChange).toBeCalledTimes(0)

    await user.click(screen.getByText('Today'))

    const todayFormated = dayjs().format('YYYY-MM-DD')

    expect(handleChange).toBeCalledTimes(1)
    expect(handleChange).toHaveBeenLastCalledWith(todayFormated)
  })

  test('popup should open when clicking on input', async () => {
    const user = userEvent.setup()

    render(<DatePicker onChange={() => {}} />)

    expect(screen.getByRole('date-picker-popup')).toHaveClass(
      'opacity-0 invisible'
    )

    await user.click(screen.getByRole('input'))

    expect(screen.getByRole('date-picker-popup')).not.toHaveClass(
      'opacity-0 invisible'
    )
  })

  test("popup should show today's date by default", async () => {
    const user = userEvent.setup()

    render(<DatePicker onChange={() => {}} />)

    await user.click(screen.getByRole('input'))

    const today = dayjs()

    expect(screen.getByRole('popup-header')).toHaveTextContent(
      `${months[today.month()]} ${today.year()}`
    )
    expect(screen.getByTestId(`date-picker-cell-${today.date()}`)).toHaveClass(
      'border border-blue-500'
    )
  })

  // test("'onChange' callback should be called with correct arguments when clicking on a cell", async () => {
  //   const user = userEvent.setup()

  //   const handleChange = jest.fn()

  //   render(<DatePicker onChange={handleChange} />)

  //   expect(handleChange).toBeCalledTimes(0)

  //   await user.click(screen.getByText('15'))

  //   const today = dayjs()

  //   expect(handleChange).toBeCalledTimes(1)
  //   expect(handleChange).toHaveBeenLastCalledWith(
  //     `${today.year()}-${today.month().toString()}-15`
  //   )
  // })
})
