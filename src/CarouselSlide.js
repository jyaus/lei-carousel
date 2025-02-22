import { useId } from "react";
import { useContext } from "react";
import { CarouselContext } from "./Carousel.js";

export default function CarouselSlide({ children, ariaLabel, ariaLabelledby }) {
  const slideId = useId();
  const accessibleTextSlideRoledescription = useContext(CarouselContext);

  return (
    <li
      className="lei-carousel-slide"
      id={slideId}
      role="group"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-roledescription={accessibleTextSlideRoledescription}
    >
      {children}
    </li>
  );
}
