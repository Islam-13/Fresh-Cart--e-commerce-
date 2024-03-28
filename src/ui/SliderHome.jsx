import Slider from "react-slick";

import imgSlider1 from "../assets/images/grocery-banner.png";
import imgSlider2 from "../assets/images/grocery-banner-2.jpeg";
import img1 from "../assets/images/slider-image-2.jpeg";
import img2 from "../assets/images/slider-image-3.jpeg";

function SliderCategories() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  return (
    <div className="container py-3">
      <div className="row justify-content-center gx-0">
        <div className="col-md-9">
          <Slider {...settings}>
            <img src={imgSlider1} alt="" height="300" />
            <img src={imgSlider2} alt="" height="300" />
          </Slider>
        </div>
        <div className="col-md-2">
          <img src={img1} alt="" width="100%" height="150" />
          <img src={img2} alt="" width="100%" height="150" />
        </div>
      </div>
    </div>
  );
}

export default SliderCategories;
