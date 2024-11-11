import { useId } from 'react';

export default function CarouselSlide({children}) {
  const slideId = useId();

  return (
    <li className="lei-carousel-slide" id={slideId}>
      {children}
    </li>
  );
}