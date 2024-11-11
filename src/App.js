import "./App.css";
import Carousel from "./Carousel.js";
import CarouselSlide from "./CarouselSlide.js";

function ExampleCarouselSlides() {
  return (
    <>
      <CarouselSlide>
        <div className="demo-content">
          <span className="demo-content-flower">🌸</span>
          first slide
        </div>
      </CarouselSlide>
      <CarouselSlide>
        <div className="demo-content">
          <span className="demo-content-flower">💮</span>
          second slide
        </div>
      </CarouselSlide>
      <CarouselSlide>
        <div className="demo-content">
          <span className="demo-content-flower">🌺</span>
          third slide
        </div>
      </CarouselSlide>
      <CarouselSlide>
        <div className="demo-content">
          <span className="demo-content-flower">🏵️</span>
          fourth slide
        </div>
      </CarouselSlide>
      <CarouselSlide>
        <div className="demo-content">
          <span className="demo-content-flower">🌷</span>
          fifth slide
        </div>
      </CarouselSlide>
      <CarouselSlide>
        <div className="demo-content">
          <span className="demo-content-flower">🌼</span>
          sixth slide
        </div>
      </CarouselSlide>
      <CarouselSlide>
        <div className="demo-content">
          <span className="demo-content-flower">🌹</span>
          seventh slide
        </div>
      </CarouselSlide>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <header>
        <h1 id="pagetitle">
          <span className="flowers" aria-hidden="true">
            🌸💮🏵️🌺
          </span>
          <span className="name">lei-carousel</span>
          <span className="flowers" aria-hidden="true">
            🌸💮🏵️🌺
          </span>
        </h1>
        <p className="slogan">
          A lightweight carousel component for React
          <br />
          by Jeff Yaus
        </p>
        <a className="button" href="https://jyaus.github.io/lei-carousel">
          View on Github
        </a>
      </header>

      <h2>Examples</h2>

      <h3>Basic carousel:</h3>
      <div className="demo-wrapper">
        <Carousel>
          <ExampleCarouselSlides />
        </Carousel>
      </div>

      <h3>Dots:</h3>
      <div className="demo-wrapper">
        <Carousel dots>
          <ExampleCarouselSlides />
        </Carousel>
      </div>

      <h3>Starting on slide 3:</h3>
      <div className="demo-wrapper">
        <Carousel initialSlide={3}>
          <ExampleCarouselSlides />
        </Carousel>
      </div>

      <h3>Showing 3.5 slides:</h3>
      <div className="demo-wrapper">
        <Carousel slidesToShow={3.5}>
          <ExampleCarouselSlides />
        </Carousel>
      </div>

      <h3>Showing 2.2 slides, with a gap of 20px:</h3>
      <div className="demo-wrapper">
        <Carousel gap="20px" slidesToShow={2.2}>
          <ExampleCarouselSlides />
        </Carousel>
      </div>

      <h3>Showing 1.2 slides:</h3>
      <div className="demo-wrapper">
        <Carousel slidesToShow={1.2}>
          <ExampleCarouselSlides />
        </Carousel>
      </div>

      <h3>Finite:</h3>
      <div className="demo-wrapper">
        <Carousel finite={true}>
          <ExampleCarouselSlides />
        </Carousel>
      </div>

      <h3>with irregular heights:</h3>
      <div className="demo-wrapper">
        <Carousel slidesToShow={3.5}>
          <CarouselSlide>
            <div className="demo-content">
              <span className="demo-content-flower">🌸</span>
              first slide
            </div>
          </CarouselSlide>
          <CarouselSlide>
            <div className="demo-content">
              <span className="demo-content-flower">💮</span>
              second slide
              <br />
              is much, much taller
              <br />
              than the others
            </div>
          </CarouselSlide>
          <CarouselSlide>
            <div className="demo-content">
              <span className="demo-content-flower">🌺</span>
              third slide
            </div>
          </CarouselSlide>
          <CarouselSlide>
            <div className="demo-content">
              <span className="demo-content-flower">🏵️</span>
              fourth slide
            </div>
          </CarouselSlide>
          <CarouselSlide>
            <div className="demo-content">
              <span className="demo-content-flower">🌷</span>
              fifth slide
            </div>
          </CarouselSlide>
          <CarouselSlide>
            <div className="demo-content">
              <span className="demo-content-flower">🌼</span>
              sixth slide
            </div>
          </CarouselSlide>
          <CarouselSlide>
            <div className="demo-content">
              <span className="demo-content-flower">🌹</span>
              seventh slide
            </div>
          </CarouselSlide>
        </Carousel>
      </div>

      <h2>Instructions</h2>
      <p>
        You can download it, and find more information,{" "}
        <a href="https://jyaus.github.io/lei-carousel">via Github</a>.
      </p>

      <pre className="code-block">
        <code>
          &lt;Carousel&gt;
          <br />
          &nbsp;&nbsp;&lt;CarouselSlide&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;content of first slide
          <br />
          &nbsp;&nbsp;&lt;/CarouselSlide&gt;
          <br />
          &nbsp;&nbsp;&lt;CarouselSlide&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;content of second slide
          <br />
          &nbsp;&nbsp;&lt;/CarouselSlide&gt;
          <br />
          &lt;/Carousel&gt;
        </code>
      </pre>

      <h3>Options</h3>

      <h4>accessibleTextDot</h4>
      <div className="option-details">
        <p>Type: string</p>
        <p>Default: "Go to slide"</p>
        <p>The accessible text to be added to each dot as an aria-label value; the number of the dot/slide will be appended to the end.</p>
      </div>

      <h4>accessibleTextNext</h4>
      <div className="option-details">
        <p>Type: string</p>
        <p>Default: "Go to next slide"</p>
        <p>The accessible text to be added to the Next button as an aria-label value.</p>
      </div>

      <h4>accessibleTextPrevious</h4>
      <div className="option-details">
        <p>Type: string</p>
        <p>Default: "Go to previous slide"</p>
        <p>The accessible text to be added to the Previous button as an aria-label value.</p>
      </div>

      <h4>dots</h4>
      <div className="option-details">
        <p>Type: boolean</p>
        <p>Default: false</p>
        <p>Whether to show the indicator dots below the carousel.</p>
      </div>

      <h4>finite</h4>
      <div className="option-details">
        <p>Type: boolean</p>
        <p>Default: false</p>
        <p>
          Whether the carousel is finite. With a finite carousel, when the user
          advances past the last slide using the buttons, it won't scroll back
          to the beginning. (Same for advancing backwards past the first slide;
          it won't scroll to the end.)
        </p>
      </div>

      <h4>gap</h4>
      <div className="option-details">
        <p>Type: string</p>
        <p>Default: null</p>
        <p>
          How much of a gap to put between slides. You need to include a unit,
          e.g. "20px" and not "20".
        </p>
      </div>

      <h4>initialSlide</h4>
      <div className="option-details">
        <p>Type: number</p>
        <p>Default: 1</p>
        <p>
          Which slide will be the current slide when the component initializes.
        </p>
      </div>

      <h4>slidesToShow</h4>
      <div className="option-details">
        <p>Type: number</p>
        <p>Default: 1</p>
        <p>How many slides will be shown at a time. Decimals are allowed.</p>
      </div>
    </div>
  );
}

export default App;
