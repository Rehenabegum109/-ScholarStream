import React from "react";

const features = [
  { title: "Verified Scholarships", desc: "All scholarships are verified for authenticity." },
  { title: "Global Opportunities", desc: "Apply to scholarships worldwide." },
  { title: "Personal Dashboard", desc: "Track your applications easily." },
];

const FeaturesSection = () => (
  <section className="py-16 bg-base-200">
    <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
      <h2 className="text-3xl font-bold text-primary mb-8">Platform Features</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div key={idx} className="p-6 bg-base-100 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-base-content">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
