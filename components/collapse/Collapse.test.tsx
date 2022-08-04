import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Collapse from './Collapse'

describe('<Collapse />', () => {
  test('should render correctly', () => {
    render(
      <Collapse>
        <Collapse.Item header='header'>test</Collapse.Item>
      </Collapse>
    )

    expect(screen.queryByRole('collapse')).toBeInTheDocument()
  })

  test("'children' prop should be rendered inside <Collapse />", () => {
    render(
      <Collapse>
        <Collapse.Item header='header'>test</Collapse.Item>
        <Collapse.Item header='header'>test</Collapse.Item>
        <Collapse.Item header='header'>test</Collapse.Item>
      </Collapse>
    )

    expect(screen.getAllByRole('collapse-item')).toHaveLength(3)
  })
})
