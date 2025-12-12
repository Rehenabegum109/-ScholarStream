import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
const FeatuedSection = () => {

    const featuredScholarships = [
  { id: 1, title: "Undergraduate Scholarship", description: "Apply before Dec 31, 2025", image: "https://images.unsplash.com/photo-1646107925391-625582fbbb8b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VW5kZXJncmFkdWF0ZSUyMFNjaG9sYXJzaGlwfGVufDB8fDB8fHww" },
  { id: 2, title: "Postgraduate Scholarship", description: "Apply before Jan 15, 2026", image: "https://images.unsplash.com/photo-1678340458877-ea3d3ddd6710?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UG9zdGdyYWR1YXRlJTIwU2Nob2xhcnNoaXB8ZW58MHx8MHx8fDA%3D" },
  { id: 3, title: "International Scholarship", description: "Apply before Feb 28, 2026", image: "https://images.unsplash.com/photo-1757441126325-73e2224a7988?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SW50ZXJuYXRpb25hbCUyMFNjaG9sYXJzaGlwfGVufDB8fDB8fHww" },
  { id: 4, title: "Country-wise Scholarship", description: "Apply before Mar 10, 2026", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z3JhZHVhdGlvbnxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 5, title: "Research Grant", description: "Apply before Apr 5, 2026", image: "https://images.unsplash.com/photo-1623461487986-9400110de28e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhZHVhdGlvbnxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 6, title: "Online Course Scholarship", description: "Apply before May 20, 2026", image: "https://images.unsplash.com/photo-1539413595691-37a09a48579b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2Nob2xhcnNoaXBzfGVufDB8fDB8fHww" },
  { id: 7, title: "Merit-based Scholarship", description: "Apply before Jun 15, 2026", image: "https://media.istockphoto.com/id/1436450608/photo/graduation-education-and-success-with-a-woman-student-holding-a-diploma-or-certificate-in.webp?a=1&b=1&s=612x612&w=0&k=20&c=JemzIi1ImZBn-pZ9ZKwIhRQWrO9d0R8269MvMbBjHqA=" },
  { id: 8, title: "Leadership Scholarship", description: "Apply before Jul 30, 2026", image: "https://images.unsplash.com/photo-1676278746104-3699ee39d192?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNjaG9sYXJzaGlwc3xlbnwwfHwwfHx8MA%3D%3D" },
  { id: 9, title: "STEM Scholarship", description: "Apply before Aug 25, 2026", image: "https://plus.unsplash.com/premium_photo-1677572452982-1796522f6565?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNjaG9sYXJzaGlwc3xlbnwwfHwwfHx8MA%3D%3D" },
  { id: 10, title: "Arts & Humanities Scholarship", description: "Apply before Sep 10, 2026", image: "https://media.istockphoto.com/id/2148332731/photo/outdoor-happy-portrait-asian-graduation-student-looking-at-camera-smiling-holding-certificate.webp?a=1&b=1&s=612x612&w=0&k=20&c=T9zlyOvgnwVC2AeSCc-gKZ-s6mbtq07pudvGY4EWx8I=" },
];
    return (
        <div>
                <section className="p-8 bg-gray-50">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
          Featured Scholarships
        </h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView="auto"
          loop={true}
          freeMode={false}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
        >
          {featuredScholarships.map((scholarship) => (
            <SwiperSlide
              key={scholarship.id}
              style={{ width: "300px" }}
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col h-full">
                {scholarship.image && (
                  <img
                    src={scholarship.image}
                    alt={scholarship.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {scholarship.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {scholarship.description}
                  </p>
                </div>
                <button className="mt-auto bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Apply Now
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
        </div>
    );
};

export default FeatuedSection;