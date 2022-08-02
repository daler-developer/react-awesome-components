import { screen, render } from '@testing-library/react'
import LinearProgress from './LinearProgress'

describe('<LinearProgress />', () => {
  test('should render correctly', () => {
    render(<LinearProgress percent={10} />)

    expect(screen.queryByRole('linear-progress')).toBeInTheDocument()
  })

  test("info block should be shown only when 'showInfo' prop equals 'true'", () => {
    const { rerender } = render(
      <LinearProgress percent={10} showInfo={false} />
    )

    expect(screen.queryByRole('linear-progress-info')).not.toBeInTheDocument()

    rerender(<LinearProgress percent={10} showInfo={true} />)

    expect(screen.queryByRole('linear-progress-info')).toBeInTheDocument()
  })

  test("passed 'percent' prop should be rendered in info block when 'showInfo' equals 'true'", () => {
    render(<LinearProgress percent={45} showInfo />)

    expect(screen.getByRole('linear-progress-info')).toHaveTextContent('45')
  })
})
