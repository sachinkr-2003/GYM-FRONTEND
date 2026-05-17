import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
  const defaultPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '29',
      duration: 'per month',
      features: [
        'Access to Gym Equipment',
        'Locker Room Access',
        'Free Wi-Fi',
        '1 Group Class per week'
      ],
      recommended: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '59',
      duration: 'per month',
      features: [
        'All Basic Features',
        'Unlimited Group Classes',
        'Free Diet Plan',
        'Access to Sauna',
        '1 PT Session per month'
      ],
      recommended: true
    },
    {
      id: 'elite',
      name: 'Elite',
      price: '99',
      duration: 'per month',
      features: [
        'All Pro Features',
        'Unlimited PT Sessions',
        'Personalized Diet Plan',
        'Massage Therapy',
        'Bring a Guest Free'
      ],
      recommended: false
    }
  ];

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const savedPlans = localStorage.getItem('gym_plans');
    if (savedPlans) {
      setPlans(JSON.parse(savedPlans));
    } else {
      localStorage.setItem('gym_plans', JSON.stringify(defaultPlans));
      setPlans(defaultPlans);
    }
  }, []);

  return (
    <section id="pricing" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-2">Pricing Plans</h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase italic text-white mb-6">
            Choose Your Tier
          </h3>
          <p className="text-zinc-400 text-lg">
            Flexible membership options to fit your lifestyle and fitness goals. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative bg-zinc-900  border ${plan.recommended ? 'border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.15)] transform md:-translate-y-4' : 'border-zinc-800'} p-8 flex flex-col`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-zinc-950 font-bold uppercase tracking-wider text-xs px-4 py-1 ">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h4 className="text-xl font-bold text-white uppercase tracking-wider mb-4">{plan.name}</h4>
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-black text-white">${plan.price}</span>
                  <span className="text-zinc-400 font-medium pb-1">/{plan.duration}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-zinc-300">
                    <Check className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`btn-liquid w-full py-4  font-bold uppercase tracking-wide transition-all ${plan.recommended ? 'bg-amber-500 hover:bg-amber-600 text-zinc-950' : 'bg-zinc-800 hover:bg-zinc-700 text-white'}`}>
                <span>Choose {plan.name}</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Pricing;
