import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Radio from '../index'

describe('<RadioGroup />', () => {
  test('should render correctly', () => {
    render(
      <Radio.Group value='first' onChange={() => {}}>
        <Radio.Item value='first'>First</Radio.Item>
        <Radio.Item value='second'>Second</Radio.Item>
      </Radio.Group>
    )

    expect(screen.queryByRole('radio-group')).toBeInTheDocument()
  })

  test('should render radio items', () => {
    render(
      <Radio.Group value='first' onChange={() => {}}>
        <Radio.Item value='first'>First</Radio.Item>
        <Radio.Item value='second'>Second</Radio.Item>
      </Radio.Group>
    )

    expect(screen.queryAllByRole('radio-item')).toHaveLength(2)
  })

  test("'onChange' callback should be called with correct arguments", async () => {
    const user = userEvent.setup()

    const handleChange = jest.fn()

    render(
      <Radio.Group value='first' onChange={handleChange}>
        <Radio.Item value='first'>First</Radio.Item>
        <Radio.Item value='second'>Second</Radio.Item>
      </Radio.Group>
    )

    expect(handleChange).toBeCalledTimes(0)

    await user.click(screen.getAllByRole('radio-item')[0])

    expect(handleChange).toBeCalledTimes(1)
    expect(handleChange).toHaveBeenLastCalledWith('first')
  })
})
