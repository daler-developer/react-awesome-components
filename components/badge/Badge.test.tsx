import { render, screen } from '@testing-library/react'
import Badge from './Badge'

describe('<Badge />', () => {
  test('should render correctly', () => {
    render(
      <Badge count={1}>
        <div></div>
      </Badge>
    )

    expect(screen.queryByRole('badge')).toBeInTheDocument()
  })

  test("'children' prop should be injected", () => {
    render(
      <Badge count={1}>
        <div role='child-element'></div>
      </Badge>
    )

    expect(screen.queryByRole('child-element')).toBeInTheDocument()
  })
})
