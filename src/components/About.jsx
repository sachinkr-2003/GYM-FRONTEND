import React, { useState, useEffect, useRef } from 'react';
import { Target, Users, Trophy } from 'lucide-react';

const AnimatedCounter = ({ value, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.8 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, value, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

const About = () => {
  const stats = [
    { icon: <Users className="w-8 h-8 text-amber-500" />, numValue: 2000, suffix: '+', label: 'Active Members' },
    { icon: <Trophy className="w-8 h-8 text-amber-500" />, numValue: 50, suffix: '+', label: 'Expert Trainers' },
    { icon: <Target className="w-8 h-8 text-amber-500" />, numValue: 15, suffix: '+', label: 'Fitness Programs' },
  ];

  return (
    <section id="about" className="py-24 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" 
                alt="Gym workout" 
                className="w-full h-64 object-cover  shadow-2xl"
              />
              <img 
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop" 
                alt="Gym equipment" 
                className="w-full h-64 object-cover  shadow-2xl mt-8"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 border-4 border-zinc-950  w-32 h-32 flex items-center justify-center flex-col shadow-2xl">
              <span className="text-3xl font-black text-amber-500">
                <AnimatedCounter value={10} suffix="+" duration={1500} />
              </span>
              <span className="text-xs text-zinc-400 font-bold uppercase text-center">Years<br/>Experience</span>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="mb-8">
              <h2 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-2">About IronCore</h2>
              <h3 className="text-4xl md:text-5xl font-black uppercase italic text-white mb-6">
                We Are More Than Just A Gym
              </h3>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                At IronCore, we believe that fitness is not just about lifting weights; it's a lifestyle. Our state-of-the-art facility provides everything you need to transform your body and mind. 
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Whether you're a beginner taking your first steps or an experienced athlete pushing your limits, our expert community is here to support your journey every step of the way.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-zinc-800">
              {stats.map((stat, index) => (
                <div key={index} className="text-center sm:text-left">
                  <div className="flex justify-center sm:justify-start mb-3">{stat.icon}</div>
                  <div className="text-3xl font-black text-white mb-1">
                    <AnimatedCounter value={stat.numValue} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm font-medium text-zinc-500 uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
