import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { 
  LayoutDashboard, 
  MessageSquare, 
  CalendarCheck, 
  CreditCard, 
  LogOut,
  CheckCircle,
  XCircle,
  Trash2,
  Users,
  Tag,
  Dumbbell,
  Upload,
  Edit2,
  Activity,
  Calendar,
  Mail,
  Clock,
  Bell,
  Edit3,
  Settings,
  Menu,
  User
} from 'lucide-react';

const AdminApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Data States (Simulating Database with LocalStorage)
  const [testimonials, setTestimonials] = useState([]);
  const [plans, setPlans] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [services, setServices] = useState([]);
  const [scheduleData, setScheduleData] = useState({});
  const [scheduleActiveDay, setScheduleActiveDay] = useState('Monday');
  const [inquiries, setInquiries] = useState([]);
  
  const [currentTime, setCurrentTime] = useState(new Date());
  const [adminNotice, setAdminNotice] = useState('Welcome to IronCore Admin Panel - Manage your gym seamlessly.');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [adminProfile, setAdminProfile] = useState({
    name: 'Super Admin',
    email: 'admin@ironcore.gym',
    image: 'https://ui-avatars.com/api/?name=Super+Admin&background=f59e0b&color=18181b'
  });
  const [uploadedImage, setUploadedImage] = useState('');
  
  // Modal States
  const [showTrainerModal, setShowTrainerModal] = useState(false);
  const [editingTrainerId, setEditingTrainerId] = useState(null);
  const [newTrainerData, setNewTrainerData] = useState({ name: '', specialty: '', desc: '', image: '' });
  
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [newPlanData, setNewPlanData] = useState({ name: '', price: '', duration: '/month', features: '', recommended: false });
  
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [newServiceData, setNewServiceData] = useState({ iconName: 'Dumbbell', title: '', desc: '' });

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [editingClassId, setEditingClassId] = useState(null);
  const [newClassData, setNewClassData] = useState({ time: '', class: '', trainer: '', type: 'Intense' });
  
  useEffect(() => {
    // Clock Timer
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    // Load Notice
    const savedNotice = localStorage.getItem('gym_admin_notice');
    if (savedNotice) setAdminNotice(savedNotice);

    // Check if logged in previously (simple session)
    if (localStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
    
    // Load Admin Profile
    const savedCreds = localStorage.getItem('gym_admin_creds');
    if (savedCreds) {
      const parsed = JSON.parse(savedCreds);
      setAdminProfile({
        name: parsed.name || 'Super Admin',
        email: parsed.email || 'admin@ironcore.gym',
        image: parsed.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(parsed.name || 'Super Admin')}&background=f59e0b&color=18181b`
      });
    }
    
    // Load Testimonials
    const fetchTestimonials = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/reviews`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setTestimonials(data);
        } else {
          console.error('Error fetching testimonials: Status', res.status);
          const savedTests = localStorage.getItem('gym_testimonials');
          if (savedTests) {
            setTestimonials(JSON.parse(savedTests));
          }
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        const savedTests = localStorage.getItem('gym_testimonials');
        if (savedTests) {
          setTestimonials(JSON.parse(savedTests));
        }
      }
    };
    fetchTestimonials();
    
    // Load Plans from Backend
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/plans`);
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) setPlans(data);
          else {
            const saved = localStorage.getItem('gym_plans');
            if (saved) setPlans(JSON.parse(saved));
          }
        }
      } catch (error) { console.error('Error fetching plans:', error); }
    };
    fetchPlans();

    // Load Trainers from Backend
    const fetchTrainers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/trainers`);
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) setTrainers(data);
          else {
            const saved = localStorage.getItem('gym_trainers');
            if (saved) setTrainers(JSON.parse(saved));
          }
        }
      } catch (error) { console.error('Error fetching trainers:', error); }
    };
    fetchTrainers();

    // Load Services from Backend
    const fetchServices = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/services`);
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) setServices(data);
          else {
            const saved = localStorage.getItem('gym_services');
            if (saved) setServices(JSON.parse(saved));
          }
        }
      } catch (error) { console.error('Error fetching services:', error); }
    };
    fetchServices();

    // Load Schedule from Backend
    const fetchSchedule = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/schedule`);
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            const scheduleObj = {};
            data.forEach(item => {
              if (!scheduleObj[item.day]) scheduleObj[item.day] = [];
              scheduleObj[item.day].push(item);
            });
            setScheduleData(scheduleObj);
          } else {
            const saved = localStorage.getItem('gym_schedule');
            if (saved) setScheduleData(JSON.parse(saved));
          }
        }
      } catch (error) { console.error('Error fetching schedule:', error); }
    };
    fetchSchedule();

    // Load Inquiries from Backend
    const fetchInquiries = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/contacts`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setInquiries(data);
        } else {
          console.error('Error fetching inquiries: Status', res.status);
        }
      } catch (error) {
        console.error('Error fetching inquiries:', error);
      }
    };
    fetchInquiries();
    
    return () => clearInterval(timer);
  }, [activeTab]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password
        })
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        Swal.fire({
          title: 'Welcome Back!',
          text: 'You have logged in successfully.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          background: '#18181b',
          color: '#fff'
        }).then(() => {
          setIsAuthenticated(true);
          localStorage.setItem('admin_auth', 'true');
          localStorage.setItem('admin_token', data.token); // Save JWT token
          if (data.name) {
            setAdminProfile({
              name: data.name,
              email: data.email,
              image: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=f59e0b&color=18181b`
            });
          }
        });
      } else {
        Swal.fire({
          title: 'Access Denied', 
          text: data.message || 'Invalid credentials! Please try again.', 
          icon: 'error',
          confirmButtonColor: '#f59e0b',
          background: '#18181b',
          color: '#fff'
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong during login.',
        icon: 'error',
        confirmButtonColor: '#f59e0b',
        background: '#18181b',
        color: '#fff'
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateCredentials = (e) => {
    e.preventDefault();
    const newName = e.target.newName.value;
    const newEmail = e.target.newEmail.value;
    const newImage = e.target.newImage.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (newPassword && newPassword !== confirmPassword) {
      Swal.fire({
        title: 'Error',
        text: 'Passwords do not match!',
        icon: 'error',
        confirmButtonColor: '#f59e0b',
        background: '#18181b',
        color: '#fff'
      });
      return;
    }

    const currentCreds = JSON.parse(localStorage.getItem('gym_admin_creds')) || { password: 'admin123' };
    const finalPassword = newPassword ? newPassword : currentCreds.password;
    const finalImage = uploadedImage || newImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(newName)}&background=f59e0b&color=18181b`;

    const newCreds = {
      name: newName,
      email: newEmail,
      image: finalImage,
      password: finalPassword
    };

    localStorage.setItem('gym_admin_creds', JSON.stringify(newCreds));
    setAdminProfile({ name: newName, email: newEmail, image: finalImage });
    
    Swal.fire({
      title: 'Success!',
      text: 'Admin profile and credentials updated successfully.',
      icon: 'success',
      confirmButtonColor: '#f59e0b',
      background: '#18181b',
      color: '#fff'
    });
    
    e.target.reset();
    setUploadedImage('');
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Logged Out',
      text: 'You have been logged out successfully.',
      icon: 'success',
      confirmButtonColor: '#f59e0b',
      background: '#18181b',
      color: '#fff'
    }).then(() => {
      setIsAuthenticated(false);
      localStorage.removeItem('admin_auth');
      window.location.href = '/';
    });
  };

  // Testimonial Actions
  const handleApproveTestimonial = async (id) => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/reviews/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const updated = testimonials.map(t => (t._id === id || t.id === id) ? { ...t, status: 'approved' } : t);
        setTestimonials(updated);
        Swal.fire('Approved!', 'Review has been approved.', 'success');
      } else {
        Swal.fire('Error', 'Failed to approve review. Status: ' + res.status, 'error');
      }
    } catch (error) {
      console.error('Error approving review:', error);
      Swal.fire('Error', 'Failed to approve review.', 'error');
    }
  };

  const handleRejectTestimonial = async (id) => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/reviews/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const updated = testimonials.filter(t => (t._id !== id && t.id !== id));
        setTestimonials(updated);
        Swal.fire('Deleted!', 'Review has been removed.', 'success');
      } else {
        Swal.fire('Error', 'Failed to delete review. Status: ' + res.status, 'error');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      Swal.fire('Error', 'Failed to delete review.', 'error');
    }
  };

  const handleSavePlans = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      const token = localStorage.getItem('admin_token');
      for (const plan of plans) {
        if (plan._id) {
          await fetch(`${import.meta.env.VITE_API_URL}/admin/plans/${plan._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(plan)
          });
        }
      }
      Swal.fire('Success', 'Pricing plan updated successfully! Changes are live.', 'success');
    } catch (error) {
      console.error('Error saving plans:', error);
      Swal.fire('Error', 'Failed to save plans.', 'error');
    }
  };
  
  const handlePlanChange = (index, field, value) => {
    const updated = [...plans];
    updated[index][field] = value;
    setPlans(updated);
  };

  const openAddPlanModal = () => {
    setNewPlanData({ name: '', price: '', duration: '/month', features: '', recommended: false });
    setShowPlanModal(true);
  };

  const handleAddPlanSubmit = async (e) => {
    e.preventDefault();
    const newPlan = {
      name: newPlanData.name || 'New Plan',
      price: newPlanData.price || '0',
      duration: newPlanData.duration || '/month',
      features: newPlanData.features ? newPlanData.features.split(',').map(f => f.trim()) : ['24/7 Gym Access', 'Locker Facility', 'Free WiFi'],
      recommended: newPlanData.recommended
    };
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/plans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newPlan)
      });
      if (res.ok) {
        const data = await res.json();
        setPlans([...plans, data.data]);
        setShowPlanModal(false);
        Swal.fire('Added!', 'New plan has been created.', 'success');
      } else {
        Swal.fire('Error', 'Failed to add plan.', 'error');
      }
    } catch (error) {
      console.error('Error adding plan:', error);
      Swal.fire('Error', 'Failed to add plan.', 'error');
    }
  };

  const handleRemovePlan = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this plan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f59e0b',
      cancelButtonColor: '#3f3f46',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('admin_token');
          const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/plans/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (res.ok) {
            const updated = plans.filter(p => (p._id !== id && p.id !== id));
            setPlans(updated);
            Swal.fire('Deleted!', 'Plan has been removed.', 'success');
          } else {
            Swal.fire('Error', 'Failed to delete plan.', 'error');
          }
        } catch (error) {
          console.error('Error deleting plan:', error);
          Swal.fire('Error', 'Failed to delete plan.', 'error');
        }
      }
    });
  };

  const openAddTrainerModal = () => {
    setEditingTrainerId(null);
    setNewTrainerData({ name: '', specialty: '', desc: '', image: '' });
    setShowTrainerModal(true);
  };

  const openEditTrainerModal = (trainer) => {
    setEditingTrainerId(trainer.id);
    setNewTrainerData({ ...trainer });
    setShowTrainerModal(true);
  };

  const handleAddTrainerSubmit = async (e) => {
    e.preventDefault();
    
    const trainerData = {
      name: newTrainerData.name || 'New Coach',
      specialty: newTrainerData.specialty || 'Specialty',
      image: newTrainerData.image || 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2560&auto=format&fit=crop',
      desc: newTrainerData.desc || 'Short description about the trainer.'
    };

    try {
      const token = localStorage.getItem('admin_token');
      let res;
      if (editingTrainerId) {
        res = await fetch(`${import.meta.env.VITE_API_URL}/admin/trainers/${editingTrainerId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(trainerData)
        });
      } else {
        res = await fetch(`${import.meta.env.VITE_API_URL}/admin/trainers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(trainerData)
        });
      }

      if (res.ok) {
        const data = await res.json();
        if (editingTrainerId) {
          const updated = trainers.map(t => (t._id === editingTrainerId || t.id === editingTrainerId) ? data.data : t);
          setTrainers(updated);
        } else {
          setTrainers([...trainers, data.data]);
        }
        setShowTrainerModal(false);
        setNewTrainerData({ name: '', specialty: '', desc: '', image: '' });
        setEditingTrainerId(null);
        Swal.fire('Saved!', editingTrainerId ? 'Trainer updated successfully.' : 'New trainer has been added successfully.', 'success');
      } else {
        Swal.fire('Error', 'Failed to save trainer.', 'error');
      }
    } catch (error) {
      console.error('Error saving trainer:', error);
      Swal.fire('Error', 'Failed to save trainer.', 'error');
    }
  };

  const handleModalImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024 * 2) {
        Swal.fire('Warning', 'File is too large! Please upload an image smaller than 2MB.', 'warning');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTrainerData({...newTrainerData, image: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveTrainer = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f59e0b',
      cancelButtonColor: '#3f3f46',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('admin_token');
          const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/trainers/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (res.ok) {
            const updated = trainers.filter(t => (t._id !== id && t.id !== id));
            setTrainers(updated);
            Swal.fire('Deleted!', 'Trainer has been removed.', 'success');
          } else {
            Swal.fire('Error', 'Failed to delete trainer.', 'error');
          }
        } catch (error) {
          console.error('Error deleting trainer:', error);
          Swal.fire('Error', 'Failed to delete trainer.', 'error');
        }
      }
    });
  };

  const openAddServiceModal = () => {
    setEditingServiceId(null);
    setNewServiceData({ iconName: 'Dumbbell', title: '', desc: '' });
    setShowServiceModal(true);
  };

  const openEditServiceModal = (service) => {
    setEditingServiceId(service.id);
    setNewServiceData({ ...service });
    setShowServiceModal(true);
  };

  const handleAddServiceSubmit = async (e) => {
    e.preventDefault();
    
    const serviceData = {
      iconName: newServiceData.iconName || 'Dumbbell',
      title: newServiceData.title || 'New Service',
      desc: newServiceData.desc || 'Service description here.'
    };

    try {
      const token = localStorage.getItem('admin_token');
      let res;
      if (editingServiceId) {
        res = await fetch(`${import.meta.env.VITE_API_URL}/admin/services/${editingServiceId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(serviceData)
        });
      } else {
        res = await fetch(`${import.meta.env.VITE_API_URL}/admin/services`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(serviceData)
        });
      }

      if (res.ok) {
        const data = await res.json();
        if (editingServiceId) {
          const updated = services.map(s => (s._id === editingServiceId || s.id === editingServiceId) ? data.data : s);
          setServices(updated);
        } else {
          setServices([...services, data.data]);
        }
        setShowServiceModal(false);
        setEditingServiceId(null);
        setNewServiceData({ iconName: 'Dumbbell', title: '', desc: '' });
        Swal.fire('Saved!', editingServiceId ? 'Service updated successfully.' : 'New service has been added successfully.', 'success');
      } else {
        Swal.fire('Error', 'Failed to save service.', 'error');
      }
    } catch (error) {
      console.error('Error saving service:', error);
      Swal.fire('Error', 'Failed to save service.', 'error');
    }
  };

  const handleRemoveService = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this service!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f59e0b',
      cancelButtonColor: '#3f3f46',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('admin_token');
          const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/services/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (res.ok) {
            const updated = services.filter(s => (s._id !== id && s.id !== id));
            setServices(updated);
            Swal.fire('Deleted!', 'Service has been removed.', 'success');
          } else {
            Swal.fire('Error', 'Failed to delete service.', 'error');
          }
        } catch (error) {
          console.error('Error deleting service:', error);
          Swal.fire('Error', 'Failed to delete service.', 'error');
        }
      }
    });
  };

  // Schedule Logic
  const openAddScheduleModal = () => {
    setEditingClassId(null);
    setNewClassData({ time: '', class: '', trainer: '', type: 'Intense' });
    setShowScheduleModal(true);
  };

  const openEditScheduleModal = (classItem) => {
    setEditingClassId(classItem.id);
    setNewClassData({ ...classItem });
    setShowScheduleModal(true);
  };

  const handleAddScheduleSubmit = async (e) => {
    e.preventDefault();
    
    const classData = {
      day: scheduleActiveDay,
      time: newClassData.time || '00:00 AM',
      class: newClassData.class || 'New Class',
      trainer: newClassData.trainer || 'Trainer',
      type: newClassData.type || 'Intense'
    };

    try {
      const token = localStorage.getItem('admin_token');
      let res;
      if (editingClassId) {
        res = await fetch(`${import.meta.env.VITE_API_URL}/admin/schedule/${editingClassId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(classData)
        });
      } else {
        res = await fetch(`${import.meta.env.VITE_API_URL}/admin/schedule`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(classData)
        });
      }

      if (res.ok) {
        const data = await res.json();
        const dayClasses = scheduleData[scheduleActiveDay] || [];
        let updatedClasses;
        if (editingClassId) {
          updatedClasses = dayClasses.map(c => (c._id === editingClassId || c.id === editingClassId) ? data.data : c);
        } else {
          updatedClasses = [...dayClasses, data.data];
        }
        const newScheduleData = { ...scheduleData, [scheduleActiveDay]: updatedClasses };
        setScheduleData(newScheduleData);
        
        setShowScheduleModal(false);
        setEditingClassId(null);
        setNewClassData({ time: '', class: '', trainer: '', type: 'Intense' });
        Swal.fire('Saved!', editingClassId ? 'Class updated successfully.' : 'New class has been added successfully.', 'success');
      } else {
        Swal.fire('Error', 'Failed to save class.', 'error');
      }
    } catch (error) {
      console.error('Error saving class:', error);
      Swal.fire('Error', 'Failed to save class.', 'error');
    }
  };

  const handleRemoveScheduleClass = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Remove this class from the schedule?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f59e0b',
      cancelButtonColor: '#3f3f46',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('admin_token');
          const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/schedule/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (res.ok) {
            const dayClasses = scheduleData[scheduleActiveDay] || [];
            const updatedClasses = dayClasses.filter(c => (c._id !== id && c.id !== id));
            const newScheduleData = { ...scheduleData, [scheduleActiveDay]: updatedClasses };
            setScheduleData(newScheduleData);
            Swal.fire('Deleted!', 'Class has been removed.', 'success');
          } else {
            Swal.fire('Error', 'Failed to delete class.', 'error');
          }
        } catch (error) {
          console.error('Error deleting class:', error);
          Swal.fire('Error', 'Failed to delete class.', 'error');
        }
      }
    });
  };

  const handleMarkInquiryRead = async (id) => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/contacts/${id}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const updated = inquiries.map(i => (i._id === id || i.id === id) ? { ...i, status: 'read' } : i);
        setInquiries(updated);
      } else {
        console.error('Failed to mark inquiry as read');
      }
    } catch (error) {
      console.error('Error marking inquiry as read:', error);
    }
  };

  const handleRemoveInquiry = (id) => {
    Swal.fire({
      title: 'Delete Message?',
      text: "You won't be able to recover this message!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f59e0b',
      cancelButtonColor: '#3f3f46',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = inquiries.filter(i => i.id !== id);
        setInquiries(updated);
        localStorage.setItem('gym_inquiries', JSON.stringify(updated));
        Swal.fire('Deleted!', 'Message has been removed.', 'success');
      }
    });
  };

  const handleEditNotice = () => {
    Swal.fire({
      title: 'Update Admin Notice',
      input: 'text',
      inputValue: adminNotice,
      showCancelButton: true,
      confirmButtonText: 'Save Notice',
      confirmButtonColor: '#f59e0b',
      cancelButtonColor: '#3f3f46',
      background: '#18181b',
      color: '#fff',
      inputAttributes: {
        maxlength: 120,
        autocapitalize: 'off',
        autocorrect: 'off'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setAdminNotice(result.value);
        localStorage.setItem('gym_admin_notice', result.value);
        Swal.fire('Updated!', 'The header notice has been updated.', 'success');
      }
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-800 p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-2">
              Admin <span className="text-amber-500">Portal</span>
            </h1>
            <p className="text-zinc-400">Login to manage your gym</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-zinc-400 text-sm uppercase mb-2">Email Address</label>
              <input 
                type="email" 
                value={loginData.email}
                onChange={e => setLoginData({...loginData, email: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-amber-500" 
                placeholder="admin@ironcore.gym"
                required
              />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm uppercase mb-2">Password</label>
              <input 
                type="password" 
                value={loginData.password}
                onChange={e => setLoginData({...loginData, password: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-amber-500" 
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold uppercase py-3 transition-colors">
              Access Dashboard
            </button>
          </form>
          <div className="mt-6 text-center text-zinc-500 text-sm flex flex-col gap-2">
            <p className="text-zinc-600 text-xs italic">Default: admin@ironcore.gym / admin123</p>
            <a href="/" className="hover:text-amber-500 hover:underline">← Back to Main Website</a>
          </div>
        </div>
      </div>
    );
  }

  // Calculate stats
  const pendingReviewsCount = testimonials.filter(t => t.status === 'pending').length;

  return (
    <div className="h-screen bg-zinc-950 flex overflow-hidden">
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              Iron<span className="text-amber-500">Core</span>
            </h2>
            <p className="text-zinc-500 text-xs mt-1 uppercase tracking-wider">Admin Panel</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-zinc-400 hover:text-white">
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          <button 
            onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium uppercase tracking-wide transition-colors ${activeTab === 'dashboard' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button 
            onClick={() => { setActiveTab('inquiries'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium uppercase tracking-wide transition-colors ${activeTab === 'inquiries' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
          >
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5" /> Inbox
            </div>
            {inquiries.filter(i => i.status === 'unread').length > 0 && (
              <span className={`px-2 py-0.5 text-xs font-bold ${activeTab === 'inquiries' ? 'bg-zinc-950 text-amber-500' : 'bg-amber-500 text-zinc-950'}`}>
                {inquiries.filter(i => i.status === 'unread').length}
              </span>
            )}
          </button>
          <button 
            onClick={() => { setActiveTab('testimonials'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium uppercase tracking-wide transition-colors ${activeTab === 'testimonials' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5" /> Reviews
            </div>
            {pendingReviewsCount > 0 && (
              <span className={`px-2 py-0.5 text-xs font-bold ${activeTab === 'testimonials' ? 'bg-zinc-950 text-amber-500' : 'bg-amber-500 text-zinc-950'}`}>
                {pendingReviewsCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => { setActiveTab('bookings'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium uppercase tracking-wide transition-colors ${activeTab === 'bookings' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
          >
            <CalendarCheck className="w-5 h-5" /> Bookings
          </button>
          <button 
            onClick={() => { setActiveTab('payments'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium uppercase tracking-wide transition-colors ${activeTab === 'payments' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
          >
            <CreditCard className="w-5 h-5" /> Payments
          </button>
          <button 
            onClick={() => { setActiveTab('trainers'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${activeTab === 'trainers' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
          >
            <Dumbbell className="w-5 h-5" /> Trainers
          </button>
          <button 
            onClick={() => { setActiveTab('services'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${activeTab === 'services' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
          >
            <Activity className="w-5 h-5" /> Services
          </button>
          <button 
            onClick={() => { setActiveTab('schedule'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${activeTab === 'schedule' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
          >
            <Calendar className="w-5 h-5" /> Timetable
          </button>
          <button 
            onClick={() => { setActiveTab('plans'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${activeTab === 'plans' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
          >
            <Tag className="w-5 h-5" /> Plans
          </button>
        </nav>
        <div className="p-4 border-t border-zinc-800 space-y-2 shrink-0">
          <button 
            onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium uppercase tracking-wide transition-colors ${activeTab === 'settings' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
          >
            <Settings className="w-4 h-4" /> Settings
          </button>
          <button 
            onClick={handleLogout}
            className="btn-liquid w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium uppercase tracking-wide text-red-500 hover:bg-red-500/10 transition-colors border border-red-500/20"
          >
            <span className="flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Log Out
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-zinc-950 w-full">
        
        {/* Top Header Row (Pinned to top) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-zinc-900 border-b border-zinc-800 p-4 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="md:hidden text-zinc-400 hover:text-amber-500 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3 text-amber-500 font-bold uppercase text-xs md:text-sm tracking-wide whitespace-nowrap">
              <Clock className="w-5 h-5 hidden sm:block" />
              {currentTime.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })} 
              <span className="text-zinc-600 hidden sm:inline">|</span> 
              <span className="hidden sm:inline">{currentTime.toLocaleTimeString('en-US')}</span>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-end gap-4 w-full sm:w-auto">
            {/* Notice Bar */}
            <div 
              onClick={handleEditNotice}
              className="hidden lg:flex flex-1 max-w-md bg-zinc-950 border border-zinc-800 px-4 py-2.5 items-center gap-3 cursor-pointer hover:border-amber-500/50 transition-colors group"
              title="Click to edit notice"
            >
              <Bell className="w-4 h-4 text-zinc-500 flex-shrink-0" />
              <div className="overflow-hidden relative flex-1">
                <p className="text-zinc-300 text-sm italic truncate">{adminNotice}</p>
              </div>
              <Edit3 className="w-3.5 h-3.5 text-zinc-600 group-hover:text-amber-500 transition-colors flex-shrink-0" />
            </div>

            {/* Message Notification Bell */}
            <button 
              onClick={() => setActiveTab('inquiries')}
              className="relative p-2.5 bg-zinc-950 border border-zinc-800 hover:border-amber-500/50 text-zinc-400 hover:text-white transition-colors"
              title="Inbox Messages"
            >
              <Mail className="w-5 h-5" />
              {inquiries.filter(i => i.status === 'unread').length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                  {inquiries.filter(i => i.status === 'unread').length}
                </span>
              )}
            </button>
            
            {/* Review Notification */}
            <button 
              onClick={() => setActiveTab('testimonials')}
              className="relative p-2.5 bg-zinc-950 border border-zinc-800 hover:border-amber-500/50 text-zinc-400 hover:text-white transition-colors"
              title="Pending Reviews"
            >
              <MessageSquare className="w-5 h-5" />
              {pendingReviewsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-zinc-950 text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {pendingReviewsCount}
                </span>
              )}
            </button>
            
            {/* Admin Profile Display */}
            <div className="flex items-center gap-3 pl-4 border-l border-zinc-800 ml-2">
              <div className="hidden md:block text-right">
                <p className="text-white text-sm font-bold leading-tight">{adminProfile.name}</p>
                <p className="text-amber-500 text-[10px] uppercase tracking-wider font-bold">Administrator</p>
              </div>
              <img src={adminProfile.image} alt="Admin" className="w-12 h-[60px] rounded object-cover border border-zinc-700 bg-zinc-900" />
            </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className={`flex-1 ${activeTab === 'settings' ? 'overflow-y-hidden' : 'overflow-y-auto'} p-4 md:p-6 ${activeTab === 'settings' ? 'no-scrollbar' : ''}`}>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide mb-6">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-zinc-900 border border-zinc-800 p-4 border-l-4 border-l-amber-500">
                <div className="text-zinc-400 text-xs uppercase font-bold tracking-wider mb-2">Total Trainers</div>
                <div className="text-3xl font-black text-white">{trainers.length}</div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-4 border-l-4 border-l-blue-500">
                <div className="text-zinc-400 text-xs uppercase font-bold tracking-wider mb-2">Gym Services</div>
                <div className="text-3xl font-black text-white">{services.length}</div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-4 border-l-4 border-l-green-500">
                <div className="text-zinc-400 text-xs uppercase font-bold tracking-wider mb-2">Active Plans</div>
                <div className="text-3xl font-black text-white">{plans.length}</div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-4 border-l-4 border-l-purple-500">
                <div className="text-zinc-400 text-xs uppercase font-bold tracking-wider mb-2">Unread Messages</div>
                <div className="text-3xl font-black text-white">{inquiries.filter(i => i.status === 'unread').length}</div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-8">
              <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-4">Welcome Admin</h3>
              <p className="text-zinc-400 leading-relaxed">
                This is your central control panel. Here you can manage everything from your gym's timetable and staff, 
                to services and pricing plans. The <span className="text-amber-500 font-bold">Reviews</span> section allows you to approve or reject 
                customer testimonials before they go live on the main website. All changes are synced instantly.
              </p>
            </div>
          </div>
        )}

        {/* Inquiries / Inbox Tab */}
        {activeTab === 'inquiries' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Inbox Messages</h2>
              <div className="bg-amber-500/10 text-amber-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
                {inquiries.filter(i => i.status === 'unread').length} Unread
              </div>
            </div>

            <div className="space-y-4">
              {inquiries.length === 0 ? (
                <div className="p-8 text-center border border-zinc-800 text-zinc-500">No messages found.</div>
              ) : (
                inquiries.map(inquiry => (
                  <div key={inquiry.id} className={`bg-zinc-900 border ${inquiry.status === 'unread' ? 'border-amber-500/50' : 'border-zinc-800'} p-6 flex flex-col md:flex-row gap-6 items-start`}>
                    <div className="flex-1 w-full">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <h4 className="text-lg font-bold text-white uppercase">{inquiry.firstName} {inquiry.lastName}</h4>
                          {inquiry.status === 'unread' && (
                            <span className="text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider bg-amber-500 text-zinc-950">
                              New
                            </span>
                          )}
                        </div>
                        <span className="text-zinc-500 text-xs font-medium">{inquiry.date}</span>
                      </div>
                      <p className="text-amber-500 text-sm font-bold uppercase tracking-wide mb-1">{inquiry.subject}</p>
                      <p className="text-zinc-400 text-xs mb-4">{inquiry.email}</p>
                      
                      <div className="bg-zinc-950 border border-zinc-800 p-4">
                        <p className="text-zinc-300 text-sm whitespace-pre-wrap">{inquiry.message}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
                      {inquiry.status === 'unread' && (
                        <button 
                          onClick={() => handleMarkInquiryRead(inquiry._id || inquiry.id)}
                          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-zinc-950 px-4 py-3 font-bold uppercase text-xs transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" /> Mark Read
                        </button>
                      )}
                      <a 
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${inquiry.email}&su=Re: ${encodeURIComponent(inquiry.subject)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-zinc-800 hover:bg-amber-500 text-white hover:text-zinc-950 px-4 py-3 font-bold uppercase text-xs transition-colors"
                      >
                        <Mail className="w-4 h-4" /> Reply
                      </a>
                      <button 
                        onClick={() => handleRemoveInquiry(inquiry.id)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-zinc-800 hover:bg-red-500 text-white hover:text-white px-4 py-3 font-bold uppercase text-xs transition-colors"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Manage Reviews</h2>
              <div className="bg-amber-500/10 text-amber-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
                {pendingReviewsCount} Pending Approval
              </div>
            </div>

            <div className="space-y-4">
              {testimonials.length === 0 ? (
                <div className="p-8 text-center border border-zinc-800 text-zinc-500">No reviews found.</div>
              ) : (
                testimonials.map(review => (
                  <div key={review.id} className={`bg-zinc-900 border ${review.status === 'pending' ? 'border-amber-500/50' : 'border-zinc-800'} p-4 flex flex-col md:flex-row gap-4 items-start md:items-center`}>
                    <img src={review.image} alt={review.name} className="w-12 h-12 object-cover border border-zinc-700" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-base font-bold text-white uppercase">{review.name}</h4>
                        <span className={`text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider ${review.status === 'pending' ? 'bg-amber-500 text-zinc-950' : 'bg-green-500/10 text-green-500'}`}>
                          {review.status}
                        </span>
                      </div>
                      <p className="text-zinc-500 text-xs mb-2">{review.role}</p>
                      <p className="text-zinc-300 text-sm italic">"{review.content}"</p>
                    </div>
                    
                    <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                      {review.status === 'pending' && (
                        <button 
                          onClick={() => handleApproveTestimonial(review._id || review.id)}
                          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-zinc-950 px-4 py-2 font-bold uppercase text-sm transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" /> Approve
                        </button>
                      )}
                      <button 
                        onClick={() => handleRejectTestimonial(review._id || review.id)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-zinc-800 hover:bg-red-500 text-white hover:text-white px-4 py-2 font-bold uppercase text-sm transition-colors"
                      >
                        <Trash2 className="w-4 h-4" /> {review.status === 'pending' ? 'Reject' : 'Delete'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Manage Pricing Plans</h2>
              <button onClick={openAddPlanModal} className="bg-green-500 hover:bg-green-600 text-zinc-950 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors">
                + Add Plan
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan, index) => (
                  <div key={plan.id} className={`bg-zinc-900 border ${plan.recommended ? 'border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'border-zinc-800'} p-6 flex flex-col relative`}>
                    {plan.recommended && <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>}
                    
                    <button 
                      onClick={() => handleRemovePlan(plan.id)}
                      className="absolute top-4 right-4 text-zinc-500 hover:text-red-500 transition-colors"
                      title="Delete Plan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="mb-4 mt-2">
                      <label className="block text-zinc-400 text-xs uppercase mb-2">Plan Name</label>
                      <input 
                        type="text" 
                        value={plan.name}
                        onChange={(e) => handlePlanChange(index, 'name', e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 text-white font-bold focus:outline-none focus:border-amber-500 transition-colors" 
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-zinc-400 text-xs uppercase mb-2">Price ($)</label>
                      <input 
                        type="number" 
                        value={plan.price}
                        onChange={(e) => handlePlanChange(index, 'price', e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 text-amber-500 font-black text-xl focus:outline-none focus:border-amber-500 transition-colors" 
                      />
                    </div>
                    <div className="mb-6 flex items-center gap-3 bg-zinc-950 p-3 border border-zinc-800">
                      <input 
                        type="checkbox" 
                        checked={plan.recommended}
                        onChange={(e) => handlePlanChange(index, 'recommended', e.target.checked)}
                        className="w-4 h-4 accent-amber-500" 
                      />
                      <label className="text-zinc-400 text-xs uppercase font-bold tracking-wider">Mark as Popular</label>
                    </div>
                    
                    <button onClick={handleSavePlans} className="mt-auto w-full bg-zinc-800 hover:bg-amber-500 text-white hover:text-zinc-950 font-bold uppercase py-3 text-xs tracking-wider transition-colors border border-zinc-700 hover:border-amber-500">
                      Save Plan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Trainers Tab */}
        {activeTab === 'trainers' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Manage Trainers</h2>
              <button onClick={openAddTrainerModal} className="bg-green-500 hover:bg-green-600 text-zinc-950 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors">
                + Add Trainer
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainers.map((trainer) => (
                  <div key={trainer.id} className="bg-zinc-900 border border-zinc-800 p-0 flex flex-col overflow-hidden group relative">
                    <div className="h-40 relative overflow-hidden">
                      <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>
                    </div>
                    <div className="p-4 relative -mt-8 flex-1 flex flex-col">
                      <h4 className="text-[16px] font-black text-white uppercase italic tracking-wider leading-tight">{trainer.name}</h4>
                      <p className="text-amber-500 font-bold text-[11px] mb-1">{trainer.specialty}</p>
                      <p className="text-zinc-400 text-xs line-clamp-2 mb-3 flex-1 leading-snug">{trainer.desc}</p>
                      <div className="flex gap-2 mt-auto pt-2 border-t border-zinc-800">
                        <button onClick={() => openEditTrainerModal(trainer)} className="flex-1 flex items-center justify-center gap-1 bg-zinc-800 hover:bg-amber-500 text-white hover:text-zinc-950 px-2 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors">
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button onClick={() => handleRemoveTrainer(trainer.id)} className="flex items-center justify-center bg-zinc-800 hover:bg-red-500 text-white px-3 py-2 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Manage Services</h2>
              <button onClick={openAddServiceModal} className="bg-green-500 hover:bg-green-600 text-zinc-950 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors">
                + Add Service
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div key={service.id} className="bg-zinc-900 border border-zinc-800 p-6 flex flex-col relative group hover:border-amber-500/50 transition-colors">
                  <div className="bg-zinc-950 w-12 h-12 flex items-center justify-center mb-4 border border-zinc-800">
                    <Activity className="w-6 h-6 text-amber-500" />
                  </div>
                  <h4 className="text-lg font-black text-white uppercase tracking-wider mb-2">{service.title}</h4>
                  <p className="text-zinc-400 text-sm mb-6 flex-1">{service.desc}</p>
                  
                  <div className="flex gap-2 mt-auto pt-4 border-t border-zinc-800">
                    <button onClick={() => openEditServiceModal(service)} className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-amber-500 text-white hover:text-zinc-950 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors">
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button onClick={() => handleRemoveService(service.id)} className="flex items-center justify-center bg-zinc-800 hover:bg-red-500 text-white px-3 py-2 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Manage Timetable</h2>
              <button onClick={openAddScheduleModal} className="bg-green-500 hover:bg-green-600 text-zinc-950 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors">
                + Add Class
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                <button
                  key={day}
                  onClick={() => setScheduleActiveDay(day)}
                  className={`px-4 py-2 font-bold uppercase tracking-wide text-xs transition-colors ${
                    scheduleActiveDay === day 
                    ? 'bg-amber-500 text-zinc-950' 
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-4">
              <h3 className="text-xl font-bold text-white mb-4 uppercase">{scheduleActiveDay}'s Classes</h3>
              {(!scheduleData[scheduleActiveDay] || scheduleData[scheduleActiveDay].length === 0) ? (
                <p className="text-zinc-500 italic">No classes scheduled for {scheduleActiveDay}.</p>
              ) : (
                <div className="space-y-3">
                  {scheduleData[scheduleActiveDay].map((cls) => (
                    <div key={cls.id} className="bg-zinc-950 border border-zinc-800 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-amber-500/50 transition-colors">
                      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                        <div>
                          <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-1">Time</p>
                          <p className="text-amber-500 font-bold">{cls.time}</p>
                        </div>
                        <div>
                          <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-1">Class</p>
                          <p className="text-white font-bold uppercase">{cls.class}</p>
                        </div>
                        <div>
                          <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-1">Trainer</p>
                          <p className="text-zinc-300 text-sm">{cls.trainer}</p>
                        </div>
                        <div>
                          <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-1">Intensity</p>
                          <span className="bg-zinc-800 text-zinc-300 text-[10px] px-2 py-1 uppercase tracking-wider">{cls.type}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 w-full md:w-auto">
                        <button onClick={() => openEditScheduleModal(cls)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-zinc-800 hover:bg-amber-500 text-white hover:text-zinc-950 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors">
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button onClick={() => handleRemoveScheduleClass(cls.id)} className="flex items-center justify-center bg-zinc-800 hover:bg-red-500 text-white px-3 py-2 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-lg mx-auto mt-6">
            <style>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
            <div className="bg-zinc-900 border border-zinc-800 p-8">
              <div className="flex items-center gap-4 mb-6 border-b border-zinc-800 pb-6">
                <div className="bg-amber-500/10 p-3 rounded text-amber-500">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white uppercase italic tracking-wide">Account Settings</h2>
                  <p className="text-zinc-500 text-xs">Update your admin login credentials</p>
                </div>
              </div>

              <form onSubmit={handleUpdateCredentials} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 text-xs uppercase mb-1 font-bold">Admin Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-zinc-600 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        name="newName"
                        type="text" 
                        required
                        defaultValue={adminProfile.name}
                        className="w-full bg-zinc-950 border border-zinc-800 pl-10 pr-3 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors text-sm" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-xs uppercase mb-1 font-bold">Email ID</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-zinc-600 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        name="newEmail"
                        type="email" 
                        required
                        defaultValue={adminProfile.email}
                        className="w-full bg-zinc-950 border border-zinc-800 pl-10 pr-3 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors text-sm" 
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 text-xs uppercase mb-1 font-bold">Profile Image</label>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-20 bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden shrink-0 rounded">
                      {uploadedImage || adminProfile.image ? (
                        <img src={uploadedImage || adminProfile.image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-8 h-8 text-zinc-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors text-xs file:bg-zinc-800 file:text-white file:border-0 file:px-2 file:py-0.5 file:mr-3 file:hover:bg-amber-500 file:hover:text-zinc-950 file:transition-colors file:text-xs file:font-bold" 
                      />
                      <p className="text-zinc-500 text-[10px] mt-1">Upload a photo or leave empty to keep current avatar.</p>
                    </div>
                  </div>
                  {/* Hidden input to maintain form structure if needed for URL fallback */}
                  <input type="hidden" name="newImage" value="" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 text-xs uppercase mb-1 font-bold">New Password</label>
                    <input 
                      name="newPassword"
                      type="password" 
                      placeholder="Leave blank to keep current"
                      className="w-full bg-zinc-950 border border-zinc-800 px-3 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-xs uppercase mb-1 font-bold">Confirm Password</label>
                    <input 
                      name="confirmPassword"
                      type="password" 
                      placeholder="Confirm new password"
                      className="w-full bg-zinc-950 border border-zinc-800 px-3 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors text-sm" 
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black uppercase tracking-wide py-4 transition-colors text-sm shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        </div>
      </main>

      {/* Add Trainer Modal */}
      {showTrainerModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 p-8 max-w-lg w-full relative">
            <button 
              onClick={() => setShowTrainerModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <XCircle className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-black uppercase italic text-white mb-6">
              {editingTrainerId ? 'Edit Trainer' : 'Add New Trainer'}
            </h3>
            <form onSubmit={handleAddTrainerSubmit} className="space-y-4">
              <div>
                <label className="block text-zinc-400 text-sm uppercase mb-2">Name</label>
                <input 
                  required type="text" value={newTrainerData.name}
                  onChange={(e) => setNewTrainerData({...newTrainerData, name: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-amber-500" 
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm uppercase mb-2">Specialty</label>
                <input 
                  required type="text" value={newTrainerData.specialty}
                  onChange={(e) => setNewTrainerData({...newTrainerData, specialty: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-amber-500" 
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm uppercase mb-2">Photo (Upload or URL)</label>
                <div className="flex gap-2">
                  <input 
                    type="text" value={newTrainerData.image}
                    onChange={(e) => setNewTrainerData({...newTrainerData, image: e.target.value})}
                    placeholder="Paste URL..."
                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-amber-500" 
                  />
                  <label className="bg-zinc-800 hover:bg-zinc-700 cursor-pointer p-3 border border-zinc-700 transition-colors flex items-center justify-center shrink-0">
                    <Upload className="w-5 h-5 text-zinc-300" />
                    <input type="file" accept="image/*" className="hidden" onChange={handleModalImageUpload} />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 text-sm uppercase mb-2">Description</label>
                <textarea 
                  required rows="3" value={newTrainerData.desc}
                  onChange={(e) => setNewTrainerData({...newTrainerData, desc: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-amber-500" 
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold uppercase py-4 transition-colors">
                Save Trainer
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Plan Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 p-8 max-w-lg w-full relative">
            <button 
              onClick={() => setShowPlanModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <XCircle className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-black uppercase italic text-white mb-6">Add New Plan</h3>
            <form onSubmit={handleAddPlanSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-sm uppercase mb-2">Plan Name</label>
                  <input 
                    required type="text" value={newPlanData.name}
                    onChange={(e) => setNewPlanData({...newPlanData, name: e.target.value})}
                    placeholder="e.g. Pro Plan"
                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-amber-500" 
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-sm uppercase mb-2">Price ($)</label>
                  <input 
                    required type="number" value={newPlanData.price}
                    onChange={(e) => setNewPlanData({...newPlanData, price: e.target.value})}
                    placeholder="e.g. 99"
                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-amber-500" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 text-sm uppercase mb-2">Features (Comma separated)</label>
                <textarea 
                  required rows="3" value={newPlanData.features}
                  onChange={(e) => setNewPlanData({...newPlanData, features: e.target.value})}
                  placeholder="e.g. 24/7 Access, Free WiFi, Personal Trainer"
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-amber-500" 
                ></textarea>
              </div>
              <div className="flex items-center gap-3 bg-zinc-950 p-4 border border-zinc-800">
                <input 
                  type="checkbox" 
                  checked={newPlanData.recommended}
                  onChange={(e) => setNewPlanData({...newPlanData, recommended: e.target.checked})}
                  className="w-5 h-5 accent-amber-500" 
                />
                <label className="text-white text-sm uppercase font-bold tracking-wider">Mark as Popular Plan</label>
              </div>
              <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold uppercase py-4 transition-colors">
                Save Plan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 p-8 max-w-lg w-full relative">
            <button 
              onClick={() => setShowServiceModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <XCircle className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-black uppercase italic text-white mb-6">
              {editingServiceId ? 'Edit Service' : 'Add New Service'}
            </h3>
            <form onSubmit={handleAddServiceSubmit} className="space-y-4">
              <div>
                <label className="block text-zinc-400 text-sm uppercase mb-2">Service Title</label>
                <input 
                  required type="text" value={newServiceData.title}
                  onChange={(e) => setNewServiceData({...newServiceData, title: e.target.value})}
                  placeholder="e.g. Strength Training"
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-amber-500" 
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm uppercase mb-2">Icon Name (Lucide)</label>
                <select 
                  value={newServiceData.iconName}
                  onChange={(e) => setNewServiceData({...newServiceData, iconName: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-amber-500" 
                >
                  <option value="Dumbbell">Dumbbell</option>
                  <option value="Activity">Activity</option>
                  <option value="Flame">Flame</option>
                  <option value="Heart">Heart</option>
                  <option value="Zap">Zap</option>
                  <option value="Crosshair">Crosshair</option>
                </select>
              </div>
              <div>
                <label className="block text-zinc-400 text-sm uppercase mb-2">Description</label>
                <textarea 
                  required rows="3" value={newServiceData.desc}
                  onChange={(e) => setNewServiceData({...newServiceData, desc: e.target.value})}
                  placeholder="Service description..."
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-amber-500" 
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold uppercase py-4 transition-colors">
                Save Service
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 p-8 max-w-lg w-full relative">
            <button 
              onClick={() => setShowScheduleModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <XCircle className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-black uppercase italic text-white mb-6">
              {editingClassId ? 'Edit Class' : `Add Class (${scheduleActiveDay})`}
            </h3>
            <form onSubmit={handleAddScheduleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-sm uppercase mb-2">Time</label>
                  <input 
                    required type="text" value={newClassData.time}
                    onChange={(e) => setNewClassData({...newClassData, time: e.target.value})}
                    placeholder="e.g. 06:00 AM"
                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-amber-500" 
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-sm uppercase mb-2">Intensity/Type</label>
                  <select 
                    value={newClassData.type}
                    onChange={(e) => setNewClassData({...newClassData, type: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-amber-500" 
                  >
                    <option value="Intense">Intense</option>
                    <option value="Strength">Strength</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Core">Core</option>
                    <option value="Relax">Relax</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 text-sm uppercase mb-2">Class Name</label>
                <input 
                  required type="text" value={newClassData.class}
                  onChange={(e) => setNewClassData({...newClassData, class: e.target.value})}
                  placeholder="e.g. CrossFit"
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-amber-500" 
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm uppercase mb-2">Trainer Name</label>
                <input 
                  required type="text" value={newClassData.trainer}
                  onChange={(e) => setNewClassData({...newClassData, trainer: e.target.value})}
                  placeholder="e.g. Mike Johnson"
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:border-amber-500" 
                />
              </div>
              
              <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold uppercase py-4 transition-colors">
                Save Class
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApp;
