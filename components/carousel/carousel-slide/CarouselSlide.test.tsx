import { render, screen } from '@testing-library/react'
import CarouselSlide from './CarouselSlide'

describe('<CarouselSlide />', () => {
  test('should render correctly', () => {
    render(<CarouselSlide>2</CarouselSlide>)

    expect(screen.queryByRole('carousel-slide')).toBeInTheDocument()
  })

  test("'children' prop should be rendered", () => {
    render(
      <CarouselSlide>
        <div role='child-el'>test</div>
      </CarouselSlide>
    )

    expect(screen.queryByRole('child-el')).toBeInTheDocument()
  })
})
