import React from "react";

const testimonials = [
  { name: "Alice", text: "This platform helped me get my dream scholarship!" },
  { name: "Bob", text: "Easy to use and very reliable." },
  { name: "Cathy", text: "I love the personal dashboard to track my applications." },
];

const TestimonialsSection = () => (
  <section className="py-16 bg-base-100">
    <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
      <h2 className="text-3xl font-bold text-primary mb-8">Testimonials</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <div key={idx} className="p-6 bg-base-200 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-base-content mb-4">"{t.text}"</p>
            <h4 className="font-semibold text-primary">{t.name}</h4>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
