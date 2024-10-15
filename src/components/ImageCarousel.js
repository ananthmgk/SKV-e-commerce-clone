import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import slide1RKRWorld from "../assets/Images/slider/Slide1-RKR-World.jpg";
import slide2RKRWorld from "../assets/Images/slider/Slide2-RKR-World.jpg";

const ImageCarousel = () => {
  return (
    <div
      style={{
        paddingBottom: "30px",
        position: "relative",
        zIndex: "1",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        marginTop: "90px",
        marginBottom: "30px",
      }}
    >
      <Carousel
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 1,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 1,
          },
        }}
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="carousel-container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        <img
          src={slide1RKRWorld}
          alt="banner1"
          style={{
            display: "block",
            margin: "auto",
            width: "100%",
          }}
        />
        <img
          src={slide2RKRWorld}
          style={{
            display: "block",
            margin: "auto",
            width: "100%",
          }}
        />
      </Carousel>
    </div>
  );
};
export default ImageCarousel;
