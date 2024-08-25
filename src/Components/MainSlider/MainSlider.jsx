import React from 'react'
import Slider from "react-slick";
import slide1 from "../../assets/images/slide1.jpg"
import slide2 from "../../assets/images/slide2.jpg"
import slide3 from "../../assets/images/slide3.jpg"
import slide4 from "../../assets/images/slide4.jpg"
import slide5 from "../../assets/images/slide5.jpg"
export default function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2000
      };
    
    
  return (
   <>

<div className=" flex flex-row justify-center align-middle md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-1 p-[60px] my-3 ">
    <div className=" w-3/4  ">
    <Slider {...settings}>
    <img src={slide1} className=' cursor-pointer w-[200px] h-[400px]  object-contain' alt="bagback" />
    <img src={slide2} className=' cursor-pointer w-[300px] h-[400px] object-contain' alt="bagback" />
    <img src={slide3} className=' cursor-pointer h-[400px] w-[400px] object-contain ' alt="bagback" />

</Slider>
    </div>
    <div className=" w-1/4 ">
    <img src={slide4}  className="w-full h-[200px]" alt="accessories" />
    <img src={slide5} className="w-full h-[200px]" alt="guitar" />

    </div>
</div>

  


   </>
  )
}
