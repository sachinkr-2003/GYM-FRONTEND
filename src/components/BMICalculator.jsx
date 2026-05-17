import React, { useState } from 'react';
import { Activity } from 'lucide-react';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');

  const calculateBMI = (e) => {
    e.preventDefault();
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);
      
      if (bmiValue < 18.5) setStatus('Underweight');
      else if (bmiValue >= 18.5 && bmiValue < 24.9) setStatus('Normal Weight');
      else if (bmiValue >= 25 && bmiValue < 29.9) setStatus('Overweight');
      else setStatus('Obese');
    }
  };

  return (
    <section className="py-24 bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-2">Check Your Health</h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase italic text-white mb-6">
              BMI Calculator
            </h3>
            <p className="text-zinc-400 text-lg mb-8">
              Body Mass Index (BMI) is a measure of body fat based on height and weight that applies to adult men and women. Check your BMI to see where you stand!
            </p>
            
            <form onSubmit={calculateBMI} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-zinc-400 font-medium mb-2 uppercase text-sm">Weight (kg)</label>
                  <input 
                    type="number" 
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g. 70"
                    className="w-full bg-zinc-950 border border-zinc-800  px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-medium mb-2 uppercase text-sm">Height (cm)</label>
                  <input 
                    type="number" 
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g. 175"
                    className="w-full bg-zinc-950 border border-zinc-800  px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    required
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="btn-liquid bg-amber-500 hover:bg-amber-600 text-zinc-950 px-8 py-4  font-bold uppercase tracking-wide transition-all w-full"
              >
                <span>Calculate My BMI</span>
              </button>
            </form>
          </div>

          <div className="bg-zinc-950 p-10  border border-zinc-800 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
            {bmi ? (
              <div className="animate-in fade-in zoom-in duration-300">
                <div className="text-amber-500 mb-4 flex justify-center">
                  <Activity className="w-16 h-16" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">Your BMI is</h4>
                <div className="text-7xl font-black text-amber-500 italic mb-4">{bmi}</div>
                <div className="inline-block px-4 py-2 bg-zinc-900 border border-zinc-800 ">
                  <span className="text-white font-bold uppercase tracking-widest">{status}</span>
                </div>
              </div>
            ) : (
              <div>
                <Activity className="w-16 h-16 text-zinc-800 mx-auto mb-4" />
                <p className="text-zinc-500 font-medium uppercase tracking-wider">Enter your details to see the result</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default BMICalculator;
