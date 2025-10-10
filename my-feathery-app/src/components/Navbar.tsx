import React from 'react';

interface NavbarProps {
  onContact: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onContact }) => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center fixed w-full top-0 z-20">
      <div className="text-xl font-bold">Feathery</div>

      <ul className="flex space-x-6 items-center">
        <li>
          <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
        </li>
        <li>
          <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
        </li>
        <li>
          <a href="#" className="text-gray-600 hover:text-gray-900">Services</a>
        </li>

        <li>
          <button
            onClick={onContact}
            className="text-white bg-red-400 rounded-md px-4 py-2 hover:bg-red-500 focus:outline-none"
          >
            Contact
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
