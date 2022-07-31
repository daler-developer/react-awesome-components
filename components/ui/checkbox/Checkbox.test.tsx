import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Checkbox from './Checkbox'

describe('<Checkbox />', () => {
  test('should render', () => {
    render(<Checkbox checked={true} onChange={() => {}} />)

    expect(screen.queryByRole('checkbox')).toBeInTheDocument()
  })

  test("'onChange' prop function should be called when clicking on root element", async () => {
    const user = userEvent.setup()

    const onChange = jest.fn()

    render(<Checkbox checked={true} onChange={onChange} />)

    await user.click(screen.getByRole('checkbox'))

    expect(onChange).toBeCalledTimes(1)
  })

  test("'onChange' function should be called with 'false' value when 'checked' prop equals 'true'", async () => {
    const user = userEvent.setup()

    const onChange = jest.fn()

    render(<Checkbox checked={true} onChange={onChange} />)

    await user.click(screen.getByRole('checkbox'))

    expect(onChange.mock.calls[0][0]).toEqual(false)
  })

  test("'onChange' function should be called with 'true' value when 'checked' prop equals 'false'", async () => {
    const user = userEvent.setup()

    const onChange = jest.fn()

    render(<Checkbox checked={false} onChange={onChange} />)

    await user.click(screen.getByRole('checkbox'))

    expect(onChange.mock.calls[0][0]).toEqual(true)
  })
})
