import { render, screen } from '@testing-library/react'
import Carousel from './Carousel'
import userEvent from '@testing-library/user-event'

describe('<Carousel />', () => {
  test('should render correctly', () => {
    render(
      <Carousel>
        <Carousel.Slide>1</Carousel.Slide>
      </Carousel>
    )

    expect(screen.queryByRole('carousel'))
  })

  test('<Carousel.Slide /> should be rendered', () => {
    const { rerender } = render(
      <Carousel>
        <Carousel.Slide>1</Carousel.Slide>
      </Carousel>
    )

    expect(screen.getAllByRole('carousel-slide')).toHaveLength(1)

    rerender(
      <Carousel>
        <Carousel.Slide>1</Carousel.Slide>
        <Carousel.Slide>2</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide>
      </Carousel>
    )

    expect(screen.getAllByRole('carousel-slide')).toHaveLength(3)
  })

  // test("'onChangeSlide' callback should be called with correct args when active slide changes", async () => {
  //   const user = userEvent.setup()

  //   const onChangeSlide = jest.fn()

  //   render(
  //     <Carousel onChangeSlide={onChangeSlide}>
  //       <Carousel.Slide>1</Carousel.Slide>
  //       <Carousel.Slide>2</Carousel.Slide>
  //       <Carousel.Slide>3</Carousel.Slide>
  //     </Carousel>
  //   )

  //   expect(onChangeSlide).toHaveBeenCalledTimes(1)

  //   await user.click(screen.getAllByRole('carousel-slide')[0])

  //   expect(onChangeSlide).toHaveBeenCalledTimes(1)
  //   expect(onChangeSlide).toHaveBeenLastCalledWith(0)

  //   await user.click(screen.getAllByRole('carousel-slide')[2])

  //   expect(onChangeSlide).toHaveBeenCalledTimes(2)
  //   expect(onChangeSlide).toHaveBeenLastCalledWith(2)
  // })
})
