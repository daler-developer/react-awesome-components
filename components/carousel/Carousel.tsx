import cn from 'classnames'
import {
  ReactElement,
  Children,
  cloneElement,
  useRef,
  useState,
  useEffect,
} from 'react'
import CarouselSlide from './carousel-slide/CarouselSlide'

interface IProps {
  children: ReactElement[] | ReactElement
  autoPlay?: boolean
  onChangeSlide?: (slideIndex: number) => void
  defaultActiveSlideIndex?: number
}

export default function Carousel({
  children,
  autoPlay = false,
  onChangeSlide,
  defaultActiveSlideIndex,
}: IProps) {
  const [slidesWrapperStyles, setSlidesWrapperStyles] = useState({
    left: '0',
  })
  const [activeSlideIndex, setActiveSlideIndex] = useState(
    defaultActiveSlideIndex || 0
  )

  const wrapperRef = useRef<HTMLDivElement>(null!)
  const slidesRefs = useRef<HTMLElement[]>([])

  const slidesCount = Array.isArray(children) ? children.length : 1

  const isFirstRender = useRef(true)

  useEffect(() => {
    // if (isFirstRender.current === false) {
    if (onChangeSlide) {
      onChangeSlide(activeSlideIndex)
    }
    // } else {
    // isFirstRender.current = false
    // }
  }, [activeSlideIndex, onChangeSlide])

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoPlay) {
        if (activeSlideIndex + 1 === slidesCount) {
          setActiveSlideIndex(0)
        } else {
          setActiveSlideIndex((prev) => prev + 1)
        }
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [activeSlideIndex, autoPlay])

  useEffect(() => {
    slidesRefs.current.forEach((ref) => {
      ref.style.flex = `0 0 ${
        wrapperRef.current.getBoundingClientRect().width
      }px`
    })
  }, [])

  useEffect(() => {
    const left = -(
      activeSlideIndex * wrapperRef.current.getBoundingClientRect().width
    )

    setSlidesWrapperStyles({ left: `${left}px` })
  }, [activeSlideIndex])

  const handleDotClick = (i: number) => {
    setActiveSlideIndex(i)
  }

  const dots = []

  for (let i = 0; i < slidesCount; i++) {
    dots.push(i)
  }

  return (
    <div
      role='carousel'
      ref={wrapperRef}
      className={cn('border-[2px] relative overflow-hidden')}
    >
      <div
        style={{ ...slidesWrapperStyles }}
        className={cn('flex transition-all relative')}
      >
        {Children.map(children, (child, i) =>
          cloneElement(child, {
            ref: (el: HTMLElement) => (slidesRefs.current[i] = el),
            key: i,
          })
        )}
      </div>

      <ul className='absolute bottom-[10px] left-1/2 -translate-x-1/2 flex gap-[4px]'>
        {dots.map((_, i) => (
          <li
            className='h-[5px] w-[25px] border border-gray-500 bg-gray-300 cursor-pointer'
            onClick={() => handleDotClick(i)}
          ></li>
        ))}
      </ul>
    </div>
  )
}

Carousel.Slide = CarouselSlide
