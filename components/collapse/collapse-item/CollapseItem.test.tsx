import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CollapseItem from './CollapseItem'

describe('<CallapseItem />', () => {
  test('should render correctly', () => {
    render(<CollapseItem header='Header'>Hello</CollapseItem>)

    expect(screen.queryByRole('collapse-item')).toBeInTheDocument()
  })

  test("'header' prop should be rendered", () => {
    render(<CollapseItem header='Header'>Hello</CollapseItem>)

    expect(screen.queryByRole('collapse-item-header')).toHaveTextContent(
      'Header'
    )
  })

  test("'children' prop should be rendered", () => {
    render(<CollapseItem header='Header'>Hello</CollapseItem>)

    expect(screen.queryByRole('collapse-item-content')).toHaveTextContent(
      'Hello'
    )
  })

  test('content should be closed and open when clicking', async () => {
    const user = userEvent.setup()

    render(<CollapseItem header='Header'>Hello</CollapseItem>)

    expect(screen.queryByRole('collapse-item-content')).toHaveStyle(
      'height: 0px'
    )
  })
})
