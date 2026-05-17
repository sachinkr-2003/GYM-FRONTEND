import React, { useState } from 'react';

const Schedule = () => {
  const [activeDay, setActiveDay] = useState('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const defaultScheduleData = {
    'Monday': [
      { id: '1', time: '06:00 AM', class: 'CrossFit', trainer: 'Mike Johnson', type: 'Intense' },
      { id: '2', time: '09:00 AM', class: 'Yoga Flow', trainer: 'Sarah Smith', type: 'Relax' },
      { id: '3', time: '05:00 PM', class: 'Bodybuilding', trainer: 'John Doe', type: 'Strength' },
      { id: '4', time: '07:00 PM', class: 'Zumba', trainer: 'Anna Lee', type: 'Cardio' }
    ],
    'Tuesday': [
      { id: '5', time: '07:00 AM', class: 'HIIT', trainer: 'Mike Johnson', type: 'Intense' },
      { id: '6', time: '10:00 AM', class: 'Pilates', trainer: 'Sarah Smith', type: 'Core' },
      { id: '7', time: '06:00 PM', class: 'Powerlifting', trainer: 'John Doe', type: 'Strength' },
    ],
    'Wednesday': [
      { id: '8', time: '06:00 AM', class: 'CrossFit', trainer: 'Mike Johnson', type: 'Intense' },
      { id: '9', time: '08:00 AM', class: 'Boxing', trainer: 'Chris Rock', type: 'Cardio' },
      { id: '10', time: '05:00 PM', class: 'Bodybuilding', trainer: 'John Doe', type: 'Strength' },
      { id: '11', time: '07:00 PM', class: 'Yoga Flow', trainer: 'Sarah Smith', type: 'Relax' }
    ],
    'Thursday': [
      { id: '12', time: '07:00 AM', class: 'HIIT', trainer: 'Mike Johnson', type: 'Intense' },
      { id: '13', time: '06:00 PM', class: 'Powerlifting', trainer: 'John Doe', type: 'Strength' },
      { id: '14', time: '07:30 PM', class: 'Zumba', trainer: 'Anna Lee', type: 'Cardio' }
    ],
    'Friday': [
      { id: '15', time: '06:00 AM', class: 'CrossFit', trainer: 'Mike Johnson', type: 'Intense' },
      { id: '16', time: '09:00 AM', class: 'Yoga Flow', trainer: 'Sarah Smith', type: 'Relax' },
      { id: '17', time: '05:00 PM', class: 'Bodybuilding', trainer: 'John Doe', type: 'Strength' },
    ],
    'Saturday': [
      { id: '18', time: '08:00 AM', class: 'Bootcamp', trainer: 'All Trainers', type: 'Intense' },
      { id: '19', time: '10:00 AM', class: 'Yoga Flow', trainer: 'Sarah Smith', type: 'Relax' }
    ]
  };

  const [scheduleData, setScheduleData] = useState({});

  React.useEffect(() => {
    const saved = localStorage.getItem('gym_schedule');
    if (saved) {
      setScheduleData(JSON.parse(saved));
    } else {
      setScheduleData(defaultScheduleData);
      localStorage.setItem('gym_schedule', JSON.stringify(defaultScheduleData));
    }
  }, []);

  return (
    <section id="schedule" className="py-24 bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-2">Class Timetable</h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase italic text-white mb-6">
            Plan Your Week
          </h3>
          <p className="text-zinc-400 text-lg">
            Find the perfect time to sweat. Our comprehensive schedule ensures there's a class for everyone, every day.
          </p>
        </div>

        {/* Days Navigation */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`btn-liquid px-6 py-3  font-bold uppercase tracking-wide text-sm transition-all ${
                activeDay === day 
                ? 'bg-amber-500 text-zinc-950' 
                : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800 hover:border-amber-500/50'
              }`}
            >
              <span>{day}</span>
            </button>
          ))}
        </div>

        {/* Schedule Table */}
        <div className="bg-zinc-950  border border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900 border-b border-zinc-800">
                  <th className="p-6 text-zinc-400 font-bold uppercase tracking-wider text-sm">Time</th>
                  <th className="p-6 text-zinc-400 font-bold uppercase tracking-wider text-sm">Class Name</th>
                  <th className="p-6 text-zinc-400 font-bold uppercase tracking-wider text-sm hidden md:table-cell">Trainer</th>
                  <th className="p-6 text-zinc-400 font-bold uppercase tracking-wider text-sm text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {scheduleData[activeDay]?.map((slot, index) => (
                  <tr key={index} className="hover:bg-zinc-900/50 transition-colors group">
                    <td className="p-6 font-bold text-white whitespace-nowrap">{slot.time}</td>
                    <td className="p-6">
                      <div className="font-bold text-lg text-white uppercase italic tracking-wide">{slot.class}</div>
                      <div className="text-sm text-zinc-500 md:hidden mt-1">{slot.trainer}</div>
                    </td>
                    <td className="p-6 text-zinc-400 font-medium hidden md:table-cell">{slot.trainer}</td>
                    <td className="p-6 text-right">
                      <button className="btn-liquid bg-zinc-800 hover:bg-amber-500 text-white hover:text-zinc-950 px-6 py-2  font-bold uppercase text-xs tracking-wider transition-colors">
                        <span>Book</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(!scheduleData[activeDay] || scheduleData[activeDay].length === 0) && (
              <div className="p-12 text-center text-zinc-500 font-medium">No classes scheduled for this day.</div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Schedule;
