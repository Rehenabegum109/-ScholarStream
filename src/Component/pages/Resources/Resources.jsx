const ResourcesSection = () => {
  return (
    <div className="bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-gray-100 min-h-screen">

      {/* Hero Section */}
      <section className="relative bg-blue-600 dark:bg-blue-800 text-white py-16 px-4 text-center">
        <img
          src="https://images.unsplash.com/photo-1764231467852-b609a742e082?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBwbGljYXRpb24lMjBkb2N1bWVudHxlbnwwfHwwfHx8MA%3D%3D"
          alt="students studying"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Scholarship Guide
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl">
            Everything you need to know about finding and applying for scholarships successfully.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Section 1: Introduction */}
        <section className="flex flex-col md:flex-row gap-6 items-center">
          <img
            src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3R1ZGVudHMlMjBzdHVkeWluZ3xlbnwwfHwwfHx8MA%3D%3D"
            alt="students reading"
            className="w-full md:w-1/3 rounded-lg shadow-lg"
          />
          <div className="md:w-2/3">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p>
              Scholarships are a great way to fund your education without debt. 
              This guide will help you understand the different types of scholarships, 
              how to find them, and how to apply effectively.
            </p>
          </div>
        </section>

        {/* Section 2: Types of Scholarships */}
        <section className="flex flex-col md:flex-row-reverse gap-6 items-center">
          <img
            src="https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3JhZHVhdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
            alt="graduation ceremony"
            className="w-full md:w-1/3 rounded-lg shadow-lg"
          />
          <div className="md:w-2/3">
            <h2 className="text-2xl font-semibold mb-4">Types of Scholarships</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Merit-Based:</strong> Awarded for academic, athletic, or artistic excellence.</li>
              <li><strong>Need-Based:</strong> Awarded based on financial need.</li>
              <li><strong>International:</strong> Available for students studying abroad.</li>
              <li><strong>Special Category:</strong> Scholarships for minorities, women, or specific professions.</li>
            </ul>
          </div>
        </section>

        {/* Section 3: Step-by-Step Application */}
        <section className="flex flex-col md:flex-row gap-6 items-center">
          <img
            src="https://images.unsplash.com/photo-1764231467852-b609a742e082?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBwbGljYXRpb24lMjBkb2N1bWVudHxlbnwwfHwwfHx8MA%3D%3D"
            alt="application documents"
            className="w-full md:w-1/3 rounded-lg shadow-lg"
          />
          <div className="md:w-2/3">
            <h2 className="text-2xl font-semibold mb-4">How to Apply</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Search scholarships using filters (country, degree, amount).</li>
              <li>Check eligibility criteria carefully.</li>
              <li>Prepare required documents (Transcript, SOP, CV, Recommendation Letters).</li>
              <li>Submit online application before the deadline.</li>
              <li>Track application status in your dashboard.</li>
            </ol>
          </div>
        </section>

        {/* Section 4: Tips & Best Practices */}
        <section className="flex flex-col md:flex-row-reverse gap-6 items-center">
          <img
            src="https://media.istockphoto.com/id/1080591372/photo/cartoon-man-using-a-big-light-bulb-as-a-loudhailer.webp?a=1&b=1&s=612x612&w=0&k=20&c=qNTHUdsonyixUSJ5KbyhaeGXPI38iH-NPDD8ZXQa0z8="
            alt="tips illustration"
            className="w-full md:w-1/3 rounded-lg shadow-lg"
          />
          <div className="md:w-2/3">
            <h2 className="text-2xl font-semibold mb-4">Tips & Best Practices</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Start early to avoid missing deadlines.</li>
              <li>Customize your SOP for each scholarship.</li>
              <li>Ask mentors or professors for strong recommendation letters.</li>
              <li>Proofread all documents carefully.</li>
              <li>Keep track of submitted applications.</li>
            </ul>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-white text-center py-8 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Ready to Apply?</h3>
          <p className="mb-4">Browse scholarships that match your profile and start your application today!</p>
          <a 
            href="/scholarship" 
            className="inline-block bg-blue-600 dark:bg-blue-400 text-white dark:text-gray-900 px-6 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-300 transition"
          >
            Browse Scholarships
          </a>
        </section>
      </main>
    </div>
  );
};

export default ResourcesSection;
