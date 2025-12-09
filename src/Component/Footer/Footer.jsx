import { Link } from "react-router";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import logo from '../../assets/image/images (1).jpg'

const Footer = () => {
  return (
    <footer className="bg-[#1E293B] text-white py-8 mt-10">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Logo */}

    <img className="w-[100px]" src={logo} alt="" />
          {/* Social Icons */}
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-blue-400 transition">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-pink-400 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-300 transition">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 my-5"></div>

        {/* Bottom Copyright */}
        <p className="text-center text-gray-300 text-sm">
          © {new Date().getFullYear()} ScholarStream — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
