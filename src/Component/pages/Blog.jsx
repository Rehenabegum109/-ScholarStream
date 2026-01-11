import React from "react";

const blogs = [
  { title: "Top 10 Scholarships 2026", link: "#" },
  { title: "How to Write Scholarship Essays", link: "#" },
  { title: "Tips for International Students", link: "#" },
];

const BlogSection = () => (
  <section className="py-16 bg-base-200">
    <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
      <h2 className="text-3xl font-bold text-primary mb-8">Latest Blogs</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {blogs.map((b, idx) => (
          <a key={idx} href={b.link} className="p-6 bg-base-100 rounded-lg shadow hover:shadow-lg transition block">
            <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
            <p className="text-base-content">Read more →</p>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default BlogSection;

