import React from "react";

const stats = [
  { value: "5000+", label: "Students Helped" },
  { value: "1200+", label: "Scholarships Listed" },
  { value: "95%", label: "Success Rate" },
];

const StatsSection = () => (
  <section className="py-16 bg-base-200">
    <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-8 text-center">
      {stats.map((stat, idx) => (
        <div key={idx}>
          <h3 className="text-4xl font-bold text-primary">{stat.value}</h3>
          <p className="text-base-content mt-2">{stat.label}</p>
        </div>
      ))}
    </div>
  </section>
);

export default StatsSection;
