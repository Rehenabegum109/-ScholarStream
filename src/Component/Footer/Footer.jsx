import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 mt-16 border-t border-gray-800">

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* TOP GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">

          {/* LOGO SECTION */}
          <div className="flex flex-col gap-3">

            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faGraduationCap}
                className="text-blue-500 text-3xl hover:scale-110 transition"
              />

              <span className="text-white font-semibold text-lg tracking-wide">
                ScholarStream
              </span>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              Unlock your future with global scholarships and top universities.
            </p>

          </div>

          {/* COLUMN 2 */}
          <div>
            <h3 className="text-white font-semibold mb-3">Explore</h3>
            <ul className="space-y-2">
              <li><Link className="hover:text-white transition">Home</Link></li>
              <li><Link className="hover:text-white transition">Scholarships</Link></li>
              <li><Link className="hover:text-white transition">Universities</Link></li>
              <li><Link className="hover:text-white transition">Funding</Link></li>
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="space-y-2">
              <li><Link className="hover:text-white transition">FAQ</Link></li>
              <li><Link className="hover:text-white transition">Help Center</Link></li>
              <li><Link className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* COLUMN 4 */}
          <div>
            <h3 className="text-white font-semibold mb-3">Social</h3>

            <div className="flex gap-4 text-lg mt-2">
              <a className="hover:text-white transition hover:scale-110">
                <FaFacebook />
              </a>
              <a className="hover:text-white transition hover:scale-110">
                <FaInstagram />
              </a>
              <a className="hover:text-white transition hover:scale-110">
                <FaLinkedin />
              </a>
              <a className="hover:text-white transition hover:scale-110">
                <FaGithub />
              </a>
            </div>

            <p className="text-xs text-gray-600 mt-3">
              Stay connected for updates
            </p>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} ScholarStream. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;