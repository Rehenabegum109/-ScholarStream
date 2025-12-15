
import React, { useState, useEffect } from "react";
import Banner from "../Banner/Banner";
import CategoriesSection from "../CategoriesSection/CategoriesSection";

import { motion } from "framer-motion";

import AxiosSecure from "../../Hook/AxiosSecore";
import ScholarshipCard from "../ScholarshipCard/ScholarshipCard";
import Skeleton from "../../Skeleton/Skeleton";
import FAQSection from "./FaqSection";



const Home = () => {
  const [allScholarshipsData, setAllScholarshipsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchScholarships = async () => {
      setLoading(true);
      try {
        const res = await AxiosSecure.get("/scholarships");
        // Ensure it's always an array to avoid sort/filter errors
        const data = Array.isArray(res.data) ? res.data : res.data.scholarships ?? [];
        setAllScholarshipsData(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load scholarships");
      } finally {
        setLoading(false);
      }
    };
    fetchScholarships();
  }, []);

  // Top Scholarships Section (safe)
  let topScholarships = Array.isArray(allScholarshipsData) ? allScholarshipsData : [];

  // Sort by fee
  topScholarships.sort((a, b) => (Number(a.fee || 0) - Number(b.fee || 0)));

  // Limit to 6
  topScholarships = topScholarships.slice(0, 6);

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
          <div className="grid md:grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((_, idx) => (
                <Skeleton key={idx} />
              ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : topScholarships.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {topScholarships.map((scholarship, index) => (
              <ScholarshipCard key={scholarship._id} scholarship={scholarship} index={index} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No scholarships available.</p>
        )}
      </section>

    
      
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

      <FAQSection/>

    </div>
  );
};

export default Home;
