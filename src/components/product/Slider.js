import React from "react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const Slider = ({ images }) => {
  const arr = images.split(",");
  // console.log(images);
  // console.log(typeof images);
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      className="mySwiper"
    >
      {arr.map((image, index) => (
        <SwiperSlide key={index}>
          <img className="slider_image" key={index} src={`http://localhost:8080/download?img=${image}`} alt={`Slide ${index}`} />
        </SwiperSlide>
      ))}
      {/* <SwiperSlide>
        <img className="slider_image" src={`http://localhost:8080/download?img=${arr[0]}`} alt={`Slide `} />
      </SwiperSlide> */}
    </Swiper>
  );
};

export default Slider;
