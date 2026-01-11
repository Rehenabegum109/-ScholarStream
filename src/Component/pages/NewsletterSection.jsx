import React from "react";

const NewsletterSection = () => (
  <section className="py-20 bg-base-100 text-center">
    <h2 className="text-3xl font-bold text-primary mb-4">Subscribe to Our Newsletter</h2>
    <p className="mb-6">Get the latest scholarships and updates directly in your inbox.</p>
    <form className="flex flex-col md:flex-row justify-center gap-4 max-w-xl mx-auto">
      <input type="email" placeholder="Your email" className="input input-bordered w-full md:w-auto" />
      <button type="submit" className="btn btn-primary">Subscribe</button>
    </form>
  </section>
);

export default NewsletterSection;
