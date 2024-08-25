import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [category, setcategory] = useState([]);
 

  var settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay:true,
    autoplaySpeed:1000
  };

  useEffect(() => {
    getCategories();
  }, []);
  function getCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => {
        setcategory(res.data.data);
      });
   
  }

  return (
    <>
      <Slider className="" {...settings}>
        {category.map((product,index)=>{
          return  <div className=" pb-9 "  >
            <img src={product.image} className="w-full h-[200px]"  alt="image" />  
            <h4>{product.name}</h4>  
            </div>
        })}
        
        </Slider>
    </>
  );
}
