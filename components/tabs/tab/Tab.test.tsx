import Tab from './Tab'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<Tab />', () => {
  test('should render correctly', () => {
    render(
      <Tab isActive={false} label='First' name='first' onClick={() => {}} />
    )

    expect(screen.queryByRole('tab')).toBeInTheDocument()
  })

  test("'label' prop should be rendered inside component", () => {
    render(
      <Tab isActive={false} label='First' name='first' onClick={() => {}} />
    )

    expect(screen.getByText('First')).toBeInTheDocument()
  })

  test("tab should change styles when 'isActive' is true ", () => {
    const { rerender } = render(
      <Tab isActive={false} label='First' name='first' onClick={() => {}} />
    )

    expect(screen.getByRole('tab')).not.toHaveClass('text-blue-700')

    rerender(
      <Tab isActive={true} label='First' name='first' onClick={() => {}} />
    )
    expect(screen.getByRole('tab')).toHaveClass('text-blue-700')
  })

  test("'onChange' callback should be called when needed with correct arguments", async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()

    const { rerender } = render(
      <Tab isActive={false} label='First' name='first' onClick={onClick} />
    )

    expect(onClick).toBeCalledTimes(0)

    rerender(
      <Tab isActive={false} label='First' name='first' onClick={onClick} />
    )

    await user.click(screen.getByRole('tab'))

    expect(onClick).toBeCalledTimes(1)
    expect(onClick.mock.calls[0][0]).toEqual('first')
  })
})
