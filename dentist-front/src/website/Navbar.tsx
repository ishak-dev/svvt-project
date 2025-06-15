import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-500 text-white fixed w-full z-10 shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#hero" className="text-2xl font-bold">
          Dental Clinic
        </a>
        {/* Hamburger Menu (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block sm:hidden focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-6`}
        >
          <a href="#hero" className="block hover:text-gray-300">
            Home
          </a>
          <a href="#about" className="block hover:text-gray-300">
            About
          </a>
          <a href="#services" className="block hover:text-gray-300">
            Services
          </a>
          <a href="#appointment" className="block hover:text-gray-300">
            Appointment
          </a>
          <a href="#articles" className="block hover:text-gray-300">
            Articles
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
