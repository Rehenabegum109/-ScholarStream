
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";


const faqData = {
  Visa: [
    {
      q: "Do I need a visa to study abroad?",
      a: "Yes, most countries require a student visa to study legally.",
    },
    {
      q: "How long does visa processing take?",
      a: "It depends on the country, usually between 2 to 8 weeks.",
    },
    {
      q: "Can scholarship help with visa approval?",
      a: "A scholarship can support your application, but visa approval depends on embassy rules.",
    },
  ],

  Tuition: [
    {
      q: "Do scholarships cover full tuition fees?",
      a: "Some scholarships cover full tuition, while others cover partial costs.",
    },
    {
      q: "Do I need to pay tuition before scholarship approval?",
      a: "Usually no, but it depends on the university policy.",
    },
    {
      q: "Are tuition fees different for international students?",
      a: "Yes, international students often have different fee structures.",
    },
  ],

  University: [
    {
      q: "Can I choose any university with a scholarship?",
      a: "No, scholarships are usually tied to specific universities or programs.",
    },
    {
      q: "How do I know if a university is eligible?",
      a: "Each scholarship listing includes eligible universities and requirements.",
    },
    {
      q: "Can I transfer my scholarship to another university?",
      a: "Most scholarships do not allow transfers between universities.",
    },
  ],

  Funding: [
    {
      q: "What types of funding are available?",
      a: "Funding can include tuition waivers, living stipends, and travel grants.",
    },
    {
      q: "Is funding monthly or one-time?",
      a: "Some scholarships provide monthly stipends, others offer one-time grants.",
    },
    {
      q: "Can I combine multiple funding sources?",
      a: "Yes, but some scholarships restrict combining multiple funding types.",
    },
  ],
};

export default function FAQSection() {
  const categories = Object.keys(faqData);
  const [active, setActive] = useState("Visa");
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="px-6 py-16 bg-gray-50">
      {/* TITLE */}
      <h2 className="text-3xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h2>

      {/* CATEGORY TABS */}
      <div className="flex justify-center flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActive(cat);
              setOpenIndex(null);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              active === cat
                ? "bg-red-600 text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ LIST */}
      <div className="max-w-3xl mx-auto space-y-4">
        <AnimatePresence mode="wait">
          {faqData[active].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl shadow cursor-pointer"
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            >
              <div className="p-5 font-semibold flex justify-between">
                {item.q}
                <span>{openIndex === index ? "−" : "+"}</span>
              </div>

              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-600">
                  {item.a}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}