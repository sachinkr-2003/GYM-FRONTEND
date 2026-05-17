import React, { useState, useEffect } from 'react';
import { Dumbbell, Activity, Flame, Heart, Zap, Crosshair } from 'lucide-react';

const iconMap = {
  Dumbbell: <Dumbbell className="w-10 h-10 text-amber-500" />,
  Activity: <Activity className="w-10 h-10 text-amber-500" />,
  Flame: <Flame className="w-10 h-10 text-amber-500" />,
  Heart: <Heart className="w-10 h-10 text-amber-500" />,
  Zap: <Zap className="w-10 h-10 text-amber-500" />,
  Crosshair: <Crosshair className="w-10 h-10 text-amber-500" />
};

const defaultServices = [
  { id: '1', iconName: 'Dumbbell', title: 'Strength Training', desc: 'Build muscle and increase your strength with our premium free weights and resistance machines.' },
  { id: '2', iconName: 'Activity', title: 'Cardio Fitness', desc: 'Improve your endurance and heart health in our fully equipped cardio zone.' },
  { id: '3', iconName: 'Flame', title: 'HIIT Workouts', desc: 'Burn maximum calories in minimal time with our intense high-interval classes.' },
  { id: '4', iconName: 'Heart', title: 'Yoga & Pilates', desc: 'Enhance flexibility, core strength, and mental wellbeing in our dedicated studios.' },
  { id: '5', iconName: 'Zap', title: 'CrossFit', desc: 'Functional movements performed at high intensity to prepare you for any physical challenge.' },
  { id: '6', iconName: 'Crosshair', title: 'Personal Training', desc: 'Get 1-on-1 coaching customized to your specific goals and body type.' }
];

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/services`);
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            setServices([...defaultServices, ...data]);
          } else {
            setServices(defaultServices);
          }
        } else {
          setServices(defaultServices);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices(defaultServices);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-24 bg-zinc-900 border-y border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-2">Our Services</h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase italic text-white mb-6">
            Push Your Limits
          </h3>
          <p className="text-zinc-400 text-lg">
            We offer a wide variety of fitness programs designed to cater to all fitness levels. Find the perfect routine to achieve your dream physique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-zinc-950 p-8  border border-zinc-800 hover:border-amber-500/50 transition-all group hover:-translate-y-2 duration-300"
            >
              <div className="bg-zinc-900 w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-amber-500/10 transition-colors">
                <div className="transition-transform duration-700 group-hover:rotate-[360deg]">
                  {iconMap[service.iconName] || <Dumbbell className="w-10 h-10 text-amber-500" />}
                </div>
              </div>
              <h4 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">{service.title}</h4>
              <p className="text-zinc-400 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
