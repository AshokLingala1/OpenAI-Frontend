import React from "react";
import { BiLogoSpringBoot } from "react-icons/bi";
import { SiOpenai } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-600 text-sm text-gray-600 dark:text-gray-300 flex justify-between items-center border-t border-gray-300 dark:border-gray-700">
      <span className="text-sm">
        Built with ❤️ by <strong>Ashok</strong>
      </span>
      <div className="flex items-center gap-4 text-xl">
        <BiLogoSpringBoot title="Spring Boot" className="text-green-600 bg-amber-50 rounded-2xl size-6" />
        <SiOpenai title="OpenAI" className="text-blue-600  bg-blue-50 rounded-2xl size-6" />
      </div>
    </footer>
  );
};

export default Footer;
