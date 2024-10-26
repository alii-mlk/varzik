import React from 'react'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'

const EmblaCarousel = ({ title, children, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="embla">
      {/* Title section */}
      <div className='m-4 mt-8 mb-2 text-right text-white text-4xl drop-shadow-lg'>
        <h1>{title}</h1>
      </div>

      {/* Carousel */}
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {/* Render children directly here */}
          {children}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
