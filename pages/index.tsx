import {} from 'react'
import Carousel from '../components/carousel/Carousel'

export default () => {
  return (
    <div>
      <Carousel onChangeSlide={(to) => alert(to)}>
        <Carousel.Slide>1</Carousel.Slide>
        <Carousel.Slide>1</Carousel.Slide>
        <Carousel.Slide>1</Carousel.Slide>
      </Carousel>
    </div>
  )
}
