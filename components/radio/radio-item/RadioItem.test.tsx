import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReactNode } from 'react'
import { RadioContext } from '../radio-group/RadioGroup'
import Radio from '../index'

const customRender = (children: ReactNode) => {
  return render(
    <RadioContext.Provider
      value={{ activeItem: 'second', changeActiveItem: () => {} }}
    >
      {children}
    </RadioContext.Provider>
  )
}

describe('<RadioItem />', () => {
  test('should render correctly', () => {
    customRender(<Radio.Item value='first'>First</Radio.Item>)

    expect(screen.queryByRole('radio-item')).toBeInTheDocument()
  })

  test("'children' prop should be rendered", () => {
    customRender(<Radio.Item value='first'>First</Radio.Item>)

    expect(screen.queryByRole('radio-item')).toHaveTextContent('First')
  })

  test('radio item should be active', () => {
    customRender(<Radio.Item value='second'>First</Radio.Item>)

    expect(screen.getByRole('radio-item-dot')).toHaveClass('bg-blue-600')
  })

  test('radio item should not be active', () => {
    customRender(<Radio.Item value='first'>First</Radio.Item>)

    expect(screen.getByRole('radio-item-dot')).not.toHaveClass('bg-blue-600')
  })
})
