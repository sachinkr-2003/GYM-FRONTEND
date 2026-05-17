import React, { useState, useEffect } from 'react';

const Trainers = () => {
  const defaultTrainers = [
    {
      id: '1',
      name: 'John Doe',
      specialty: 'Head Coach & Bodybuilding',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop',
      desc: '10+ years of experience in transforming bodies and building strength.'
    },
    {
      id: '2',
      name: 'Sarah Smith',
      specialty: 'Pilates & Mobility',
      image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=100&w=2560&auto=format&fit=crop',
      desc: 'Expert in flexibility, core strength, and mindfulness practices.'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      specialty: 'CrossFit & Strength',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=100&w=2560&auto=format&fit=crop',
      desc: 'High-energy trainer specializing in intense cardiovascular workouts.'
    }
  ];

  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const savedTrainers = localStorage.getItem('gym_trainers');
    if (savedTrainers) {
      setTrainers(JSON.parse(savedTrainers));
    } else {
      localStorage.setItem('gym_trainers', JSON.stringify(defaultTrainers));
      setTrainers(defaultTrainers);
    }
  }, []);

  return (
    <section id="trainers" className="py-24 bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-2">Our Experts</h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase italic text-white mb-6">
            Meet Your Coaches
          </h3>
          <p className="text-zinc-400 text-lg">
            Our certified personal trainers are here to guide, motivate, and push you to achieve results you never thought possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {trainers.map((trainer, index) => (
            <div key={index} className="bg-zinc-900  overflow-hidden border border-zinc-800 group">
              <div className="h-80 overflow-hidden relative">
                <img 
                  src={trainer.image} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-80"></div>
              </div>
              <div className="p-6 relative -mt-16 z-10">
                <h4 className="text-2xl font-black text-white uppercase italic tracking-wider">{trainer.name}</h4>
                <p className="text-amber-500 font-semibold text-sm mb-4">{trainer.specialty}</p>
                <p className="text-zinc-400 mb-6">{trainer.desc}</p>
                <a href="#contact" className="btn-liquid inline-block text-center bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 text-white px-4 py-2 font-bold text-sm uppercase tracking-wider transition-colors w-full">
                  <span>Book Session</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
