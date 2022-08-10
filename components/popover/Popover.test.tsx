import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Popover from './Popover'

describe.only('<Popover />', () => {
  test('should render correctly', () => {
    render(
      <Popover title='Title' position='top' content={<div>content</div>}>
        <div>hover over me</div>
      </Popover>
    )

    expect(screen.queryByRole('popover')).toBeInTheDocument()
  })

  test('should be hidden and shown when hovering on children', async () => {
    const user = userEvent.setup()

    render(
      <Popover title='Title' position='top' content={<div>content</div>}>
        <div data-testid='children'>hover over me</div>
      </Popover>
    )

    expect(screen.queryByRole('popover')).toHaveClass('invisible opacity-0')

    await user.hover(screen.getByTestId('children'))

    expect(screen.queryByRole('popover')).not.toHaveClass('invisible opacity-0')
  })

  test("'children', 'title', 'content' props should be rendered", () => {
    render(
      <Popover
        title='I am title'
        position='top'
        content={<div data-test-id='content'>I am content</div>}
      >
        <div data-testid='children'>hover over me</div>
      </Popover>
    )

    expect(screen.queryByText('I am content')).toBeInTheDocument()
    expect(screen.queryByText('hover over me')).toBeInTheDocument()
    expect(screen.queryByText('I am title')).toBeInTheDocument()
  })
})
