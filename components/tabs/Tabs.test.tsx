import Tabs from './Tabs'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<Tabs />', () => {
  test('should render correctly', () => {
    render(<Tabs items={[]} initialActiveTab='test' onChange={() => {}} />)

    expect(screen.queryByRole('tabs')).toBeInTheDocument()
  })

  test("tabs should be aligned correctly when passing 'align' prop", () => {
    const { rerender } = render(
      <Tabs
        items={[{ label: 'First', name: 'first' }]}
        initialActiveTab='first'
        onChange={() => {}}
        align='left'
      />
    )

    expect(screen.getByRole('tabs')).toHaveClass('justify-start')

    rerender(
      <Tabs
        items={[{ label: 'First', name: 'first' }]}
        initialActiveTab='first'
        onChange={() => {}}
        align='center'
      />
    )

    expect(screen.getByRole('tabs')).toHaveClass('justify-center')

    rerender(
      <Tabs
        items={[{ label: 'First', name: 'first' }]}
        initialActiveTab='first'
        onChange={() => {}}
        align='right'
      />
    )

    expect(screen.getByRole('tabs')).toHaveClass('justify-end')

    rerender(
      <Tabs
        items={[{ label: 'First', name: 'first' }]}
        initialActiveTab='first'
        onChange={() => {}}
      />
    )

    expect(screen.getByRole('tabs')).toHaveClass('justify-start')
  })

  test('should render correct number of Tabs', () => {
    const { rerender } = render(
      <Tabs
        items={[
          { name: 'first', label: 'First' },
          { name: 'second', label: 'Second' },
          { name: 'third', label: 'Third' },
        ]}
        initialActiveTab='first'
        onChange={() => {}}
      />
    )

    expect(screen.getAllByRole('tab')).toHaveLength(3)

    rerender(
      <Tabs
        items={[{ name: 'first', label: 'First' }]}
        initialActiveTab='first'
        onChange={() => {}}
      />
    )

    expect(screen.getAllByRole('tab')).toHaveLength(1)
  })

  test("'onChange' callback should be called when needed", async () => {
    const user = userEvent.setup()

    const onChange = jest.fn()

    render(
      <Tabs
        items={[{ name: 'first', label: 'First' }]}
        initialActiveTab='first'
        onChange={onChange}
      />
    )

    expect(onChange).toBeCalledTimes(0)

    await user.click(screen.getByRole('tab'))

    expect(onChange).toBeCalledTimes(1)

    await user.click(screen.getByRole('tab'))
    await user.click(screen.getByRole('tab'))

    expect(onChange).toBeCalledTimes(3)
  })

  test("'onChange' should be called with correct args", async () => {
    const user = userEvent.setup()

    const onChange = jest.fn()

    render(
      <Tabs
        items={[{ name: 'first', label: 'First' }]}
        initialActiveTab='first'
        onChange={onChange}
      />
    )

    await user.click(screen.getByRole('tab'))

    expect(onChange.mock.calls[0][0]).toEqual('first')
  })
})
