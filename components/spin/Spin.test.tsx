import { render, screen } from '@testing-library/react'
import Spin from './Spin'

describe('<Spin />', () => {
  test('should render correctly', () => {
    render(<Spin />)

    expect(screen.queryByRole('spin')).toBeInTheDocument()
  })

  test("'size' props should change component's size correctly", () => {
    const { rerender } = render(<Spin size='lg' />)

    screen.getAllByRole('spin-dot').forEach((dot) => {
      expect(dot).toHaveClass('w-[14px] h-[14px]')
    })

    rerender(<Spin size='md' />)

    screen.getAllByRole('spin-dot').forEach((dot) => {
      expect(dot).toHaveClass('w-[9px] h-[9px]')
    })

    rerender(<Spin size='sm' />)

    screen.getAllByRole('spin-dot').forEach((dot) => {
      expect(dot).toHaveClass('w-[6px] h-[6px]')
    })

    rerender(<Spin />)

    screen.getAllByRole('spin-dot').forEach((dot) => {
      expect(dot).toHaveClass('w-[9px] h-[9px]')
    })
  })
})
