import { useState } from "react";

const HelpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-900 pt-20 text-gray-800 dark:text-gray-100 min-h-screen px-4 py-12">

      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Help & Support</h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl">
          Need assistance? Fill out the form below or check the FAQ section to find answers.
        </p>
        <img
          src="https://images.unsplash.com/photo-1581091870626-6c91f1a41d14?auto=format&fit=crop&w=1200&q=80"
          alt="help illustration"
          className="mx-auto mt-6 rounded-lg shadow-lg"
        />
      </section>

      {/* Contact Form */}
      <section className="max-w-3xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Submit a Query</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded border dark:border-slate-700 bg-gray-100 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded border dark:border-slate-700 bg-gray-100 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 rounded border dark:border-slate-700 bg-gray-100 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 dark:bg-blue-400 text-white dark:text-gray-900 px-6 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-300 transition"
          >
            Submit
          </button>
        </form>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
        <details className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
          <summary className="cursor-pointer font-medium">How do I reset my password?</summary>
          <p className="mt-2">Go to your profile settings and click on "Change Password". Follow the instructions to reset your password.</p>
        </details>

        <details className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
          <summary className="cursor-pointer font-medium">How can I track my scholarship application?</summary>
          <p className="mt-2">After logging in, go to "My Applications" in your dashboard to track the status of your applications.</p>
        </details>

        <details className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
          <summary className="cursor-pointer font-medium">What documents are required for scholarship applications?</summary>
          <p className="mt-2">You generally need transcripts, SOP, recommendation letters, and proof of eligibility. Check the specific scholarship details for exact requirements.</p>
        </details>
      </section>
    </div>
  );
};

export default HelpPage;
