import { motion } from "framer-motion";

const FAQSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="px-6 py-16 bg-gray-50"
    >
      <h2 className="text-3xl font-bold text-center mb-10">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className=" p-5 rounded-xl shadow"
        >
          <h4 className="font-semibold text-lg">
            How do I apply for a scholarship?
          </h4>
          <p className="text-gray-600 mt-2">
            Select your preferred scholarship and click on the “View Details”
            button to complete the application process.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white p-5 rounded-xl shadow"
        >
          <h4 className="font-semibold text-lg">
            Is there any application fee?
          </h4>
          <p className="text-gray-600 mt-2">
            Some scholarships are completely free, while others may require a
            small application fee.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white p-5 rounded-xl shadow"
        >
          <h4 className="font-semibold text-lg">
            How can I get support?
          </h4>
          <p className="text-gray-600 mt-2">
            You can contact us using the information provided in the Contact Us
            section.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FAQSection;
