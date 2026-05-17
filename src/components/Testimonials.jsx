import React, { useState, useEffect } from 'react';
import { Quote, X } from 'lucide-react';
import Swal from 'sweetalert2';

const Testimonials = () => {
  const defaultReviews = [
    {
      id: '1',
      name: 'Michael R.',
      role: 'Member since 2022',
      content: 'Joining IronCore was the best decision of my life. The trainers actually care about your progress, and the environment is just built different. I lost 20kg in 6 months!',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop',
      status: 'approved'
    },
    {
      id: '2',
      name: 'Amanda T.',
      role: 'Member since 2023',
      content: 'The HIIT classes here are insane. You get pushed to your absolute limits but in a good way. The equipment is always clean and the community is super supportive.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
      status: 'approved'
    },
    {
      id: '3',
      name: 'David L.',
      role: 'Member since 2021',
      content: 'I have been to many gyms, but the premium feel and the quality of the personal training here is unmatched. It feels like a second home now.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
      status: 'approved'
    }
  ];

  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', content: '', image: '' });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/reviews');
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        const saved = localStorage.getItem('gym_testimonials');
        if (saved) {
          setReviews(JSON.parse(saved));
        } else {
          setReviews(defaultReviews);
        }
      }
    };
    fetchReviews();
  }, []);

  const approvedReviews = reviews.filter(r => r.status === 'approved');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (approvedReviews.length > 0 && !isPaused) {
      const maxIndex = isMobile ? approvedReviews.length - 1 : Math.max(0, approvedReviews.length - 3);
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [approvedReviews.length, isMobile, isPaused]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      ...formData,
      image: formData.image || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop', // Fallback to default avatar
    };
    
    try {
      const res = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });
      
      if (res.ok) {
        setFormData({ name: '', role: '', content: '', image: '' });
        setShowForm(false);
        
        Swal.fire({
          title: 'Success!',
          text: 'Thank you! Your review has been submitted and is pending admin approval.',
          icon: 'success',
          confirmButtonColor: '#f59e0b',
          background: '#18181b',
          color: '#fff'
        });
      } else {
        throw new Error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonColor: '#f59e0b',
        background: '#18181b',
        color: '#fff'
      });
    }
  };

  return (
    <section className="py-24 bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-2">Success Stories</h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase italic text-white mb-6">
            Real Results
          </h3>
          <p className="text-zinc-400 text-lg mb-8">
            Don't just take our word for it. Hear what our community has to say about their transformation journey with us.
          </p>
          <button 
            onClick={() => setShowForm(true)}
            className="btn-liquid bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold uppercase px-8 py-3 transition-colors"
          >
            <span>Write a Review</span>
          </button>
        </div>

        <div 
          className="relative max-w-7xl mx-auto overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out" 
            style={{ transform: `translateX(-${currentIndex * (isMobile ? 100 : 33.333)}%)` }}
          >
            {approvedReviews.map((review, index) => (
              <div key={index} className="w-full md:w-1/3 flex-shrink-0 px-4">
                <div className="bg-zinc-900 p-8 border border-zinc-800 relative mt-8">
                  <div className="absolute -top-6 left-8 bg-amber-500 w-12 h-12 flex items-center justify-center border-4 border-zinc-900">
                    <Quote className="w-5 h-5 text-zinc-950 fill-zinc-950" />
                  </div>
                  <p className="text-zinc-300 mb-8 mt-4 italic leading-relaxed">
                    "{review.content}"
                  </p>
                  <div className="flex items-center gap-4 border-t border-zinc-800 pt-6">
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      className="w-12 h-12 object-cover"
                    />
                    <div>
                      <h5 className="text-white font-bold uppercase">{review.name}</h5>
                      <p className="text-zinc-500 text-sm">{review.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {approvedReviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-amber-500' : 'bg-zinc-700'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Review Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 p-8 border border-zinc-800 max-w-md w-full relative">
            <button 
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-black uppercase italic text-white mb-6">Write a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-zinc-400 text-sm uppercase mb-2">Your Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-amber-500" 
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm uppercase mb-2">Role/Membership duration</label>
                <input 
                  required
                  type="text" 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-amber-500" 
                  placeholder="Member since 2024"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm uppercase mb-2">Your Photo</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData({...formData, image: reader.result});
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-amber-500 mb-4" 
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm uppercase mb-2">Your Review</label>
                <textarea 
                  required
                  rows="4"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-amber-500" 
                  placeholder="Tell us about your experience..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="btn-liquid w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold uppercase py-4"
              >
                <span>Submit for Approval</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
