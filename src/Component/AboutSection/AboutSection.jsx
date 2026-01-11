import React from "react";
import { useNavigate } from "react-router";
const AboutSection = () => {
   const navigate = useNavigate();
  return (
    <div className="bg-gray-50 text-gray-800">

      <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-10">
        
       {/* Left: Image */}
        <div className="md:w-1/2">
           <img
            src="https://plus.unsplash.com/premium_photo-1714259941101-6c7dab338791?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="About Us"
           className="w-full h-auto rounded-lg shadow-lg"
        />
     </div>

        {/* Right: Text */}
        <div className="md:w-1/2 text-center md:text-left">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
             About Our Scholarship Platform
        </h2>
         <p className="text-base-content mb-4">
          Our platform connects students with verified scholarships worldwide. 
        We help learners discover opportunities, manage applications, and achieve 
           their educational dreams with confidence.
         </p>
                  <p className="text-base-content mb-6">
             Whether you are seeking undergraduate, graduate, or international scholarships, 
            our curated database ensures you get access to the best opportunities.
          </p>
          
        </div>

       </div>
     </section>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
          <p className="text-lg leading-relaxed text-gray-600">
            We are a student-focused scholarship management platform designed to
            help students easily discover, apply for, and track scholarships.
            Our goal is to remove financial barriers and make education
            accessible for everyone.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <ul className="space-y-3 text-lg text-gray-600">
            <li>🎯 Make scholarship discovery simple and accessible</li>
            <li>🎯 Provide verified and trustworthy scholarship information</li>
            <li>🎯 Ensure a secure and smooth online application process</li>
            <li>🎯 Support students in achieving their academic goals</li>
          </ul>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">
            What We Offer
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">Verified Scholarships</h3>
              <p className="text-gray-600">
                All scholarship listings are carefully reviewed and verified.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">Easy Applications</h3>
              <p className="text-gray-600">
                Apply online with a simple and user-friendly process.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">Secure Data</h3>
              <p className="text-gray-600">
                Your personal information is safe and protected.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">Application Tracking</h3>
              <p className="text-gray-600">
                Track your scholarship application status in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We envision a future where every deserving student has access to
            quality education, regardless of financial background. Our platform
            aims to become a trusted global hub for scholarship opportunities.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Start Your Scholarship Journey Today
        </h2>
        <p className="mb-6 text-lg opacity-90">
          Explore opportunities and take the next step toward your future.
        </p>
           <button
          onClick={() => navigate("/scholarship")}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Explore Scholarships
        </button>
      </section>
    </div>
  );
};

export default AboutSection;
