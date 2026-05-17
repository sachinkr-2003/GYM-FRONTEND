import React from 'react';
import { ChevronRight, Phone, MessageCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 bg-zinc-950">
        <img 
          src="/assets/bodyBuilderDesktop.webp" 
          alt="Bodybuilder Gym Workout"
          className="w-full h-full object-cover object-center opacity-60"
        />
        {/* Dark gradient on the left side to make text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent w-full md:w-3/4 lg:w-2/3"></div>
        {/* Bottom gradient for mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent md:hidden"></div>
      </div>

      <div className="relative z-10 w-full px-4 max-w-7xl mx-auto mt-20">
        <div className="max-w-xl text-left">
          <span className="inline-block py-1 px-3 bg-zinc-900/80 border border-amber-500/30 text-amber-500 font-bold text-[10px] md:text-xs uppercase tracking-widest mb-4 backdrop-blur-sm">
            Dominate Your Limits
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase italic tracking-tight text-white mb-4 leading-tight">
            Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Champions</span> Are Forged
          </h1>
          <p className="text-sm md:text-base text-zinc-300 mb-8 font-light leading-relaxed max-w-lg">
            Step into a world-class training facility designed for those who demand more. Elite equipment, professional coaching, and an unstoppable community waiting for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-start mt-8">
            <a href="#pricing" className="btn-liquid group flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-zinc-950 px-6 py-4 font-bold uppercase tracking-wide transition-all text-xs md:text-sm w-full sm:w-auto">
              <span>Start Free Trial</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#about" className="btn-liquid flex items-center justify-center bg-zinc-800/80 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-zinc-500 px-6 py-4 font-bold uppercase tracking-wide transition-all text-xs md:text-sm backdrop-blur-sm w-full sm:w-auto">
              <span>Explore Programs</span>
            </a>
          </div>
        </div>
      </div>

      {/* Social & Contact Action Buttons (Right Corner) */}
      <div className="fixed bottom-8 right-4 md:right-8 z-[99] flex flex-col gap-3">
        {/* Facebook Button */}
        <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook" className="btn-liquid w-12 h-12 bg-[#1877F2] hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        
        {/* Instagram Button */}
        <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram" className="btn-liquid w-12 h-12 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
        </a>

        {/* WhatsApp Button */}
        <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" title="Chat on WhatsApp" className="btn-liquid w-12 h-12 bg-[#25D366] hover:bg-green-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </a>

        {/* Call Button */}
        <a href="tel:+919876543210" title="Call Us" className="btn-liquid w-12 h-12 bg-amber-500 hover:bg-amber-600 text-zinc-950 flex items-center justify-center shadow-lg transition-transform hover:scale-110">
          <Phone className="w-6 h-6" />
        </a>
      </div>
      
      {/* Decorative element bottom */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-zinc-950 to-transparent z-10 pointer-events-none"></div>
    </section>
  );
};

export default Hero;
