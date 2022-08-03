import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CircularProgress from './CircularProgress'

describe('<CircularProgress />', () => {
  test('should render correctly', () => {
    render(<CircularProgress percent={10} />)

    expect(screen.queryByRole('circular-progress')).toBeInTheDocument()
  })

  test("'percent' prop should be rendered inside progress", () => {
    render(<CircularProgress percent={10} status='normal' />)

    expect(screen.queryByRole('circular-progress')).toHaveTextContent('10')
  })

  test("when 'status' props equals 'exception' or 'success', 'percent' prop should not be rendered", () => {
    const { rerender } = render(
      <CircularProgress percent={10} status='exception' />
    )

    expect(screen.queryByRole('circular-progress')).not.toHaveTextContent('10')

    rerender(<CircularProgress percent={10} status='success' />)

    expect(screen.queryByRole('circular-progress')).not.toHaveTextContent('10')
  })

  // test("when 'status' props equals 'exception', component should render <XIcon /> and line should be red", () => {
  //   render(<CircularProgress percent={20} status='exception' />)

  //   expect(screen.queryByRole('x-icon')).toBeInTheDocument()
  //   expect(screen.getByRole('circular-progress-line')).toHaveClass(
  //     'stroke-red-500'
  //   )
  // })

  // test("when 'status' props equals 'success', component should render <CheckIcon /> and line should be green", () => {
  //   render(<CircularProgress percent={20} status='success' />)

  //   expect(screen.queryByRole('check-icon')).toBeInTheDocument()
  //   expect(screen.getByRole('circular-progress-line')).toHaveClass(
  //     'stroke-green-600'
  //   )
  // })
})
