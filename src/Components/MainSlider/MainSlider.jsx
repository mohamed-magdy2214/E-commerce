import React from "react";
import Slider from "react-slick";

import img1 from '../../Assets/images/slider-image-1.jpeg'
import img2 from '../../Assets/images/slider-image-2.jpeg'
import img3 from '../../Assets/images/slider-image-3.jpeg'




export default function MainSlider() {

    let sliders = [img1, img2, img3];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="container py-4">
        <div className="row">
          <div className="col-md-12">
            <Slider {...settings}>
                {sliders.map((img)=> <img key={img}  height={400} src={img} alt=""></img>)}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}
