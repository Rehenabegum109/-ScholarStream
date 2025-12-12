import React, { useState, useEffect } from "react";
import Banner from "../Banner/Banner";
import CategoriesSection from "../CategoriesSection/CategoriesSection";
import FeatuedSection from "../FeaturedSection/FeaturedSection";
import { motion } from "framer-motion";

import AxiosSecure from "../../Hook/AxiosSecore";
import ScholarshipCard from "../ScholarshipCard/ScholarshipCard";


const Home = () => {
  const [allScholarshipsData, setAllScholarshipsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await AxiosSecure.get("/scholarships");
        setAllScholarshipsData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load scholarships");
      } finally {
        setLoading(false);
      }
    };
    fetchScholarships();
  }, []);

  return (
    <div className="min-h-screen">

      {/* Banner Section */}
      <Banner />

      {/* Hero / Intro Section */}
      <section className="bg-blue-100 p-8 text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Find Your Perfect Scholarship</h1>
        <p className="text-blue-800 mb-6">Explore thousands of scholarships worldwide.</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Explore Scholarships
        </button>
      </section>

      {/* Top Scholarships Section */}
<section className="max-w-7xl mx-auto py-16 px-6">
  <h2 className="text-3xl font-bold mb-8 text-center">Top Scholarships</h2>

  {loading ? (
    <p className="text-center">Loading scholarships...</p>
  ) : error ? (
    <p className="text-center text-red-500">{error}</p>
  ) : (
    <div className="grid md:grid-cols-3 gap-6">
      {allScholarshipsData
        .sort((a, b) => a.fee - b.fee) 
        .slice(0, 6) 
        .map((scholarship, index) => (
          <ScholarshipCard key={scholarship._id} scholarship={scholarship} index={index} />
        ))
      }
    </div>
  )}
</section>


      {/* Featured / Other Sections */}
      <FeatuedSection />
      <CategoriesSection />

      {/* Success Stories / Testimonials Section */}
      <section className="bg-gray-100 py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Success Stories</h2>
          <div className="space-y-6">
            <p className="text-gray-700 italic">“Thanks to this platform, I received my dream scholarship abroad!” – Student A</p>
            <p className="text-gray-700 italic">“A seamless application process with lots of options for students.” – Student B</p>
          </div>
        </motion.div>
      </section>

      {/* Contact Us / F.A.Q Section */}
      <section className="py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6 text-left">
            <div>
              <h3 className="font-semibold">How can I apply for a scholarship?</h3>
              <p className="text-gray-700">Browse the scholarship and click "View Details" to apply.</p>
            </div>
            <div>
              <h3 className="font-semibold">Is there any application fee?</h3>
              <p className="text-gray-700">Some scholarships are free, while others may have a small fee.</p>
            </div>
            <div>
              <h3 className="font-semibold">Can I apply for multiple scholarships?</h3>
              <p className="text-gray-700">Yes, you can apply for multiple scholarships at the same time.</p>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;
