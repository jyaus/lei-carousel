import { useState, useEffect, useRef } from "react";
import "./lei-carousel.css";

export default function Carousel({
  children,
  slidesToShow = 1,
  finite = false,
  dots = false,
}) {
  const [slides, setSlides] = useState([1, 2, 3]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToAdvance = Math.floor(slidesToShow);
  const trackRef = useRef();
  const [urlPrev, setUrlPrev] = useState("#");
  const [urlNext, setUrlNext] = useState("#");
  const [prevIsDisabled, setPrevIsDisabled] = useState(false);
  const [nextIsDisabled, setNextIsDisabled] = useState(false);
  let buttonsInitialized = false;

  if (slidesToShow < 1) {
    slidesToShow = 1;
  }

  // TODO: scrolling full left doesn't move the dot to dot 1 once we have the throttle, sigh
  // TODO: test on ioS Safari

  const handleScroll = (event) => {
    const track = trackRef.current;
    let newCurrentSlide = 0;

    slides.forEach((slide, index) => {
      if (track.scrollLeft === 0) {
        newCurrentSlide = 0;
      } else if (track.scrollLeft > slide.offsetLeft) {
        newCurrentSlide = index + 1;
      }
      setCurrentSlide(newCurrentSlide);
    });
    
    console.log(track.scrollLeft + " -> " + newCurrentSlide);

    setUrlPrev(
      "#" +
        (newCurrentSlide === 0
          ? slides[slides.length - 1].id
          : slides[newCurrentSlide - 1].id)
    );

    let slideNextIndex = newCurrentSlide + slidesToAdvance;
    if (slideNextIndex >= slides.length - 1) {
      slideNextIndex =
        track.scrollLeft + track.offsetWidth === track.scrollWidth
          ? 0
          : slides.length - 1;
    }
    setUrlNext("#" + slides[slideNextIndex].id);

    checkDisabled(newCurrentSlide);
  };

  function throttle(callbackFn, limit) {
    let wait = false;
    return function () {
      if (!wait) {
        callbackFn.call();
        wait = true;
        setTimeout(function () {
          wait = false;
        }, limit);
      }
    };
  }

  function checkDisabled(currentSlide) {
    if (finite) {
      setPrevIsDisabled(currentSlide === 0 ? true : false);
      setNextIsDisabled(
        trackRef.current.scrollLeft + trackRef.current.offsetWidth ===
          trackRef.current.scrollWidth
          ? true
          : false
      );
    }
  }

  useEffect(() => {
    const domSlides = trackRef.current.querySelectorAll(".lei-carousel-slide");
    setSlides(domSlides);

    if (!buttonsInitialized) {
      setUrlPrev("#" + domSlides[domSlides.length - 1].id);
      setUrlNext("#" + domSlides[slidesToAdvance].id);
    }

    checkDisabled(currentSlide);
  }, [children]); // if the slides get changed dynamically, we want to re-compute things

  function CarouselDots({ slides }) {
    return (
      <>
        <ul className="lei-carousel-dots">
          {[...slides].map((slide, index) => (
            <CarouselDot
              href={"#" + slides[index].id}
              publicIndex={index + 1}
              isActive={index === currentSlide}
              key={index}
            />
          ))}
        </ul>
      </>
    );
  }

  function CarouselDot({ href = "#", isActive = false, publicIndex }) {
    return (
      <li>
        <a
          href={href}
          className={
            "lei-carousel-dot " + (isActive ? "lei-carousel-dot-active" : "")
          }
        >
          <span className="lei-carousel-dot-text">
            Go to slide {publicIndex}
          </span>
        </a>
      </li>
    );
  }

  return (
    <>
      <div
        className="lei-carousel"
        style={{
          "--lei-carousel-foo-slides-to-show": slidesToShow,
        }}
      >
        <div
          className={
            "lei-carousel-button lei-carousel-button-prev " +
            (prevIsDisabled ? "lei-carousel-button-disabled" : "")
          }
        >
          {!prevIsDisabled && (
            <a href={urlPrev} aria-label="Previous slide"></a>
          )}
        </div>
        <ol
          className="lei-carousel-track"
          ref={trackRef}
          onScroll={throttle(handleScroll, 100)}
        >
          {children}
        </ol>
        <div
          className={
            "lei-carousel-button lei-carousel-button-next " +
            (nextIsDisabled ? "lei-carousel-button-disabled" : "")
          }
        >
          {!nextIsDisabled && <a href={urlNext} aria-label="Next slide"></a>}
        </div>
        {dots && <CarouselDots slides={slides} />}
      </div>
    </>
  );
}
