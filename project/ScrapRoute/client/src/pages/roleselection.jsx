import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Truck, Store, ArrowRight, Scan, MapPin, ShieldCheck, Leaf, Zap } from 'lucide-react';

const ROLES = [
  {
    id: 'user',
    title: 'User',
    description: 'Upload e-waste images and schedule pickups',
    icon: <User size={32} className="text-white" />,
    color: 'bg-green-600'
  },
  {
    id: 'field_agent',
    title: 'Field Agent',
    description: 'Collect devices from users and deliver to vendors',
    icon: <Truck size={32} className="text-white" />,
    color: 'bg-slate-700'
  },
  {
    id: 'vendor',
    title: 'Vendor',
    description: 'Accept devices and manage recycling operations',
    icon: <Store size={32} className="text-white" />,
    color: 'bg-green-800'
  }
];

const FEATURES = [
  {
    title: "AI Image Recognition",
    desc: "Upload a photo and our AI instantly identifies the device type and brand.",
    icon: <Scan className="text-green-700" size={24} />,
    bgColor: "bg-green-50"
  },
  {
    title: "Real-Time Tracking",
    desc: "Track your e-waste pickup status and field agent location in real time.",
    icon: <MapPin className="text-blue-700" size={24} />,
    bgColor: "bg-blue-50"
  },
  {
    title: "Verified Vendors",
    desc: "All vendors are verified for proper e-waste handling practices.",
    icon: <ShieldCheck className="text-purple-700" size={24} />,
    bgColor: "bg-purple-50"
  },
  {
    title: "Eco Impact Reports",
    desc: "See how much environmental impact you've made by recycling.",
    icon: <Leaf className="text-emerald-700" size={24} />,
    bgColor: "bg-emerald-50"
  },
  {
    title: "Instant Matching",
    desc: "Get matched instantly with vendors who specifically need your model.",
    icon: <Zap className="text-amber-600" size={24} />,
    bgColor: "bg-amber-50"
  },
  {
    title: "Role-Based Access",
    desc: "Customized dashboards for users, agents, and vendors.",
    icon: <User className="text-slate-700" size={24} />,
    bgColor: "bg-slate-100"
  }
];

const LandingPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (!selectedRole) {
      alert("Please select a role first!");
      return;
    }
    navigate('/login', { state: { role: selectedRole } });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      {/* Navbar */}
      <nav className="w-full max-w-6xl flex justify-between items-center py-6">
        <div className="flex items-center gap-2">
          <div className="bg-green-600 p-2 rounded-lg">
            <Store className="text-white" size={24} />
          </div>
          
        </div>
        <div className="hidden md:flex gap-8 text-gray-900 font-medium">
          <button className="hover:text-green-600 transition">Features</button>
          <button className="hover:text-green-600 transition">About Us</button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mt-16 text-center max-w-5xl w-full">
        <h2 className="text-6xl font-bold text-gray-900 mb-2">ScrapeRoute</h2>
        <p className="text-gray-500 mb-12">AI-based E-Waste Categorization and Routing</p>

        <h2 className="text-3xl font-bold text-gray-600 mb-2">Recognized As</h2>
        <p className="text-gray-500 mb-12">Select your role to get started with our platform</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {ROLES.map((role) => (
            <div
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`cursor-pointer p-8 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center text-center
                ${selectedRole === role.id 
                  ? 'border-green-600 bg-white shadow-xl scale-105' 
                  : 'border-transparent bg-white shadow-sm hover:shadow-md'}`}
            >
              <div className={`${role.color} p-4 rounded-xl mb-6 shadow-lg`}>
                {role.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{role.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {role.description}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={handleGetStarted}
          className="bg-green-700 hover:bg-green-800 text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-2 mx-auto transition-transform active:scale-95 shadow-lg mb-24"
        >
          Get Started <ArrowRight size={20} />
        </button>

        {/* New Features Selection Part */}
        <section className="w-full pb-20 border-t border-gray-200 pt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Powerful Features</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Our platform makes e-waste recycling simple, transparent, and environmentally impactful.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className={`${feature.bgColor} p-3 rounded-xl shrink-0`}>
                  {feature.icon}
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-800 mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;