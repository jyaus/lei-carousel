# lei-carousel 🌸💮🏵️🌺
- by Jeff Yaus

## Overview

_lei-carousel_ is a carousel component for React, designed to be lightweight and
standards-compliant.

Many carousel components are large, complex, and unwieldy.
They clone or rearrange DOM notes to create an infinite loop of slides, which
can create issues when attaching handlers to the contents of those slides. 

_lei-carousel_ instead leverages the native browser behavior for basic scrolling.
Then, when the user clicks all the way to the end of the carousel, the carousel will "rewind"
and scroll back to the beginning. This style of looping eliminates the need for cloning
or rearranging DOM nodes.

- Fast performance, using as many native browser features as possible
- Easily-customized visuals

## Usage

```
<Carousel>
  <CarouselSlide>
    content of first slide
  </CarouselSlide>
  <CarouselSlide>
    content of second slide
  </CarouselSlide>
</Carousel>
```

### Props

#### accessibleTextDot

_string_. (default: "Go to slide")\
The accessible text to be added to each dot as an `aria-label` value; the number of the dot/slide will be appended to the end.

#### accessibleTextDotsLabel
      
_string_. (default: "Choose slide to display")\
The accessible text to be added to the dots container as an `aria-label` value.

#### accessibleTextNext

_string_. (default: "Go to next slide")\
The accessible text to be added to the Next button as an `aria-label` value.

#### accessibleTextPrevious

_string_. (default: "Go to previous slide")\
The accessible text to be added to the Previous button as an `aria-label` value.

#### accessibleTextRoledescription

_string_. (default: "carousel")\
The accessible text to be added as a value for the carousel's `aria-roledescription` property.
      
#### accessibleTextSlideRoledescription
      
_string_. (default: "slide")\
The accessible text to be added as a value for each slide's `aria-roledescription` property.
      
#### accessibleTextSlideOf
_string_. (default: "of")   
The accessible text to be added to each slide's accessible name, placed between its slide number and the total number of slides.\
The default is "of", which will produce "4 of 7" if this is the fourth slide out of seven slides.

#### dots

_boolean_. (default: false)\
Whether to show the indicator dots below the carousel.

#### equalizeHeights
      
_boolean_. (default: false)\
Whether to try to equalize the heights of the slides. If true, each slide container will have an equal height, but 
you may also need to put `height="100%"` on the contents of each slide to get proper visuals.
      
#### finite

_boolean_. (default: false)\
Whether the carousel is finite. With a finite carousel, when the user advances past the last
slide using the buttons, it won't scroll back to the beginning.\
(Same for advancing backwards past the first slide; it won't scroll to the end.)

#### gap

_string_. (default: null)\
How much of a gap to put between slides. You need to include a unit, e.g. "20px" and not "20".

#### initialSlide

_number_. (default: 1)\
Which slide will be the current slide when the component initializes.

#### slidesToShow

_number_. (default: 1)\
How many slides will be shown at a time. Decimals are allowed.

## Demo

See it in action at [https://jyaus.github.io/lei-carousel/](https://jyaus.github.io/lei-carousel/).