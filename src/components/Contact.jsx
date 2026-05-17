import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import Swal from 'sweetalert2';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'Membership Inquiry',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      Swal.fire({
        title: 'Error',
        text: 'Please fill in all required fields.',
        icon: 'error',
        confirmButtonColor: '#f59e0b',
        background: '#18181b',
        color: '#fff'
      });
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        Swal.fire({
          title: 'Message Sent!',
          text: 'Thank you for reaching out. Our team will contact you shortly.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          background: '#18181b',
          color: '#fff'
        });

        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: 'Membership Inquiry',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
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
    <section id="contact" className="min-h-screen flex flex-col justify-center py-12 bg-zinc-950 border-t border-zinc-800">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-1">Get In Touch</h2>
          <h3 className="text-3xl md:text-4xl font-black uppercase italic text-white mb-4">
            Join The Family
          </h3>
          <p className="text-zinc-400 text-base">
            Have questions about our memberships or programs? Drop us a message or visit us in person. We're here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Contact Info & Map */}
          <div className="space-y-4">
            <div className="bg-zinc-900 p-4  border border-zinc-800 flex items-start gap-4">
              <div className="bg-amber-500/10 p-3  text-amber-500">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-2 uppercase tracking-wide">Location</h4>
                <p className="text-zinc-400">AWADHPURI BHOPAL 462022<br/>Open 24/7 for Elite Members</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="bg-zinc-900 p-8  border border-zinc-800 flex-1">
                <div className="text-amber-500 mb-4"><Phone className="w-8 h-8" /></div>
                <h4 className="text-white font-bold mb-2 uppercase">Phone</h4>
                <p className="text-zinc-400">7808866408</p>
              </div>
              <div className="bg-zinc-900 p-8  border border-zinc-800 flex-1">
                <div className="text-amber-500 mb-4"><Mail className="w-8 h-8" /></div>
                <h4 className="text-white font-bold mb-2 uppercase">Email</h4>
                <p className="text-zinc-400">DIVYA@INFO.IN</p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-64 w-full bg-zinc-900  border border-zinc-800 overflow-hidden relative">
              <iframe 
                src="https://maps.google.com/maps?q=Awadhpuri%20Bhopal%20462022&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-70 hover:opacity-100 transition-opacity"
                title="Gym Location"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-zinc-900 p-6  border border-zinc-800">
            <h4 className="text-xl font-black text-white uppercase italic tracking-wide mb-4">Send a Message</h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-medium mb-1 text-sm uppercase">First Name *</label>
                  <input 
                    type="text" 
                    value={formData.firstName}
                    onChange={e => setFormData({...formData, firstName: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800  px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors" 
                    placeholder="John" 
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-medium mb-1 text-sm uppercase">Last Name</label>
                  <input 
                    type="text" 
                    value={formData.lastName}
                    onChange={e => setFormData({...formData, lastName: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800  px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors" 
                    placeholder="Doe" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-medium mb-1 text-sm uppercase">Email Address *</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800  px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors" 
                    placeholder="john@example.com" 
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-medium mb-1 text-sm uppercase">Phone Number</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800  px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors" 
                    placeholder="1234567890" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 font-medium mb-1 text-sm uppercase">Subject</label>
                <select 
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800  px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors appearance-none"
                >
                  <option>Membership Inquiry</option>
                  <option>Personal Training</option>
                  <option>Class Schedule</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-zinc-400 font-medium mb-1 text-sm uppercase">Message *</label>
                <textarea 
                  rows="4" 
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800  px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors" 
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button type="submit" className="btn-liquid w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold uppercase tracking-wide py-3 mt-4 transition-all">
                <span>Send Message</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
