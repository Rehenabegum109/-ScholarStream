import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const CategoriesSection = () => {
  const categories = [
    "Undergraduate",
    "Postgraduate",
    "International",
    "Country-wise",
    "Tips",
    "Online Courses",
    "Scholarship Alerts",
    "Research Opportunities",
    "Online Certificates",
  ];

  return (
    <section className="p-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Browse by Category
      </h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={40}           // ✅ slide gap
        slidesPerView="auto"
        loop={true}
        freeMode={false}
        autoplay={{
          delay: 1200,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
      >
        {categories.map((category, idx) => (
          <SwiperSlide
            key={idx}
            style={{ width: "max-content" }} // ✅ ensures proper gap
          >
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition">
              {category}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CategoriesSection;
