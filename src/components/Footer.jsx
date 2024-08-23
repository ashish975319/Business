import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 w-full mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Irix Technologies. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Designed with ❤️ using React and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
