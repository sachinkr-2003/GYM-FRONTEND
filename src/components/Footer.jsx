import React from 'react';
import { Dumbbell, MapPin, Phone, Mail, Globe, Share2, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-zinc-950 pt-20 pb-10 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Dumbbell className="h-8 w-8 text-amber-500" />
              <span className="text-2xl font-black tracking-tighter text-white uppercase">Iron<span className="text-amber-500">Core</span></span>
            </div>
            <p className="text-zinc-400 mb-6 leading-relaxed">
              Transforming bodies and changing lives. Join the strongest community in the city and reach your ultimate fitness goals.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10  bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-amber-500 hover:text-zinc-950 transition-all">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10  bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-amber-500 hover:text-zinc-950 transition-all">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10  bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-amber-500 hover:text-zinc-950 transition-all">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-zinc-400 hover:text-amber-500 transition-colors">Home</a></li>
              <li><a href="#about" className="text-zinc-400 hover:text-amber-500 transition-colors">About Us</a></li>
              <li><a href="#services" className="text-zinc-400 hover:text-amber-500 transition-colors">Services</a></li>
              <li><a href="#pricing" className="text-zinc-400 hover:text-amber-500 transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Working Hours</h4>
            <ul className="space-y-3">
              <li className="flex justify-between text-zinc-400">
                <span>Mon - Fri:</span>
                <span className="text-white font-medium">5:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between text-zinc-400">
                <span>Saturday:</span>
                <span className="text-white font-medium">6:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between text-zinc-400">
                <span>Sunday:</span>
                <span className="text-white font-medium">8:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-400">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <span>123 Fitness Street, Gym City, GC 10020</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span>join@ironcore.gym</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-zinc-900 text-center text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} <a href="https://nexabyte.in" target="_blank" rel="noreferrer" className="text-amber-500 hover:text-amber-400 hover:underline transition-colors">NexaByte.in</a>. All rights reserved. Built with ❤️ for Gym Lovers.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
