import React, { useState } from 'react';
import { Menu, X, Dumbbell } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Trainers', href: '#trainers' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 relative">
          {/* Logo - Left */}
          <div className="flex items-center gap-2 z-10">
            <Dumbbell className="h-8 w-8 text-amber-500" />
            <span className="text-2xl font-black tracking-tighter text-white uppercase">Iron<span className="text-amber-500">Core</span></span>
          </div>
          
          {/* Links - Center (Absolute to ensure perfect center) */}
          <div className="hidden lg:flex items-center space-x-6 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-zinc-300 hover:text-amber-500 transition-colors font-medium text-sm uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Button & Mobile Toggle - Right */}
          <div className="flex items-center gap-4 z-10">
            <a href="#pricing" className="btn-liquid hidden lg:block bg-amber-500 hover:bg-amber-600 text-zinc-950 px-6 py-2 font-bold transition-all uppercase tracking-wide">
              <span>Join Now</span>
            </a>
            
            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-zinc-300 hover:text-white"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-zinc-300 hover:text-amber-500 hover:bg-zinc-800 "
              >
                {link.name}
              </a>
            ))}
            <a href="#pricing" className="btn-liquid block w-full text-center mt-4 bg-amber-500 text-zinc-950 px-6 py-3 font-bold uppercase">
              <span>Join Now</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
