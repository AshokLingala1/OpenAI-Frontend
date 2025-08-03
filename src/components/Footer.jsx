import React from "react";
import { BiLogoSpringBoot } from "react-icons/bi";
import { SiOpenai } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="
  w-full px-3 py-2
  bg-gray-100 dark:bg-gray-600 text-xs sm:text-sm text-gray-600 dark:text-gray-300
  flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4
  border-t border-gray-300 dark:border-gray-700
">
  <span className="text-center">Built with ❤️ by <strong>Ashok</strong></span>
  <div className="flex items-center gap-2 sm:gap-4 text-lg sm:text-xl">
    <BiLogoSpringBoot className="text-green-600 bg-amber-50 rounded-2xl size-5 sm:size-6" />
    <SiOpenai className="text-blue-600 bg-blue-50 rounded-2xl size-5 sm:size-6" />
  </div>
</footer>

  );
};

export default Footer;
