import { useCallback, useEffect, useRef, useState } from "react";
import "./lei-carousel.css";

/**
 * Creates a lei-carousel instance.
 * @param {number} slidesToShow - How many slides will be shown at a time. Decimals are allowed.
 * @param {number} initialSlide - Which slide will be the current slide when the component initializes.
 * @param {boolean} finite - Whether the carousel scrolling is finite, instead of looping infinitely.
 * @param {boolean} dots - Whether to show the indicator dots below the carousel.
 * @param {string} gap - How much of a gap to put between slides. You need to include a unit, e.g. "20px" and not "20".
 * @param {string} accessibleTextDot - The accessible text to be added to each dot as an aria-label value; the number of the dot/slide will be appended to the end.
 * @param {string} accessibleTextNext - The accessible text to be added to the Next button as an aria-label value.
 * @param {string} accessibleTextPrevious - The accessible text to be added to the Previous button as an aria-label value.
 */

export default function Carousel({
  children,
  slidesToShow = 1,
  initialSlide = 1, // this is 1-indexed, not 0-indexed, because it's intended to be understandable by normal humans
  finite = false,
  dots = false,
  gap,
  accessibleTextPrevious = "Go to previous slide",
  accessibleTextNext = "Go to next slide",
  accessibleTextDot = "Go to slide",
}) {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0); // this one is 0-indexed because it's internal
  const slidesToAdvance = Math.floor(slidesToShow);
  const trackRef = useRef();
  const [prevIsDisabled, setPrevIsDisabled] = useState(false);
  const [nextIsDisabled, setNextIsDisabled] = useState(false);
  let buttonsInitialized = false;

  if (slidesToShow < 1) {
    slidesToShow = 1;
  }

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

    let slideNextIndex = newCurrentSlide + slidesToAdvance;

    if (slideNextIndex >= slides.length - 1) {
      slideNextIndex =
        track.scrollLeft + track.offsetWidth === track.scrollWidth
          ? 0
          : slides.length - 1;
    }

    checkDisabled(newCurrentSlide);
  };

  function scrollToSlide(num) {
    const track = trackRef.current;
    if (slides[num]) {
      const offset = slides[num].offsetLeft;
      track.scrollTo({ left: offset });
    }
  }

  function scrollToPrev() {
    scrollToSlide(currentSlide <= 0 ? slides.length - 1 : currentSlide - 1);
  }

  function scrollToNext() {
    const track = trackRef.current;

    console.log(
      currentSlide + " / " + track.scrollLeft + " ~~ " + track.offsetWidth
    );

    scrollToSlide(
      currentSlide + 1 >= slides.length ||
        track.scrollLeft === track.scrollWidth - track.offsetWidth
        ? 0
        : currentSlide + 1
    );
  }

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

  const checkDisabled = useCallback(
    (currentSlide) => {
      if (finite) {
        setPrevIsDisabled(currentSlide === 0 ? true : false);
        setNextIsDisabled(
          trackRef.current.scrollLeft + trackRef.current.offsetWidth ===
            trackRef.current.scrollWidth
            ? true
            : false
        );
      }
    },
    [finite]
  );

  useEffect(() => {
    if (initialSlide !== 1) {
      trackRef.current.scrollTo({
        left: trackRef.current.querySelectorAll(".lei-carousel-slide")[
          initialSlide - 1
        ].offsetLeft,
      });
      setCurrentSlide(initialSlide - 1);
    }
  }, [initialSlide]);

  useEffect(() => {
    setSlides(trackRef.current.querySelectorAll(".lei-carousel-slide"));
    checkDisabled(currentSlide);
  }, [
    buttonsInitialized,
    checkDisabled,
    currentSlide,
    slidesToAdvance,
    children,
  ]);

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
        <button
          href={href}
          className={
            "lei-carousel-dot " + (isActive ? "lei-carousel-dot-active" : "")
          }
          aria-label={accessibleTextDot + " " + publicIndex}
          onClick={() => scrollToSlide(publicIndex - 1)}
        />
      </li>
    );
  }

  return (
    <>
      <div
        className={"lei-carousel " + (dots && "lei-carousel-show-dots")}
        style={{
          "--lei-carousel-foo-slides-to-show": slidesToShow,
        }}
      >
        <button
          className="lei-carousel-button lei-carousel-button-prev "
          disabled={prevIsDisabled}
          aria-label={accessibleTextPrevious}
          onClick={throttle(scrollToPrev, 100)}
        />
        <ol
          className="lei-carousel-track"
          ref={trackRef}
          onScroll={handleScroll}
          style={{ "--lei-carousel-track-gap": gap }}
        >
          {children}
        </ol>
        <button
          className="lei-carousel-button lei-carousel-button-next "
          aria-label={accessibleTextNext}
          disabled={nextIsDisabled ? "true" : ""}
          onClick={throttle(scrollToNext, 100)}
        />
        {dots && <CarouselDots slides={slides} />}
      </div>
    </>
  );
}
