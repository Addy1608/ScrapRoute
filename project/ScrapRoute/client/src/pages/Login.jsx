import { useState, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Default to 'seller' if no role was passed from the previous page
  const selectedRole = location.state?.role || 'seller';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Pass credentials to your AuthContext login function
    const result = await login(email, password, selectedRole);
    
    if (result.success) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      
      // REDIRECTION LOGIC MATCHING YOUR ROUTES
      if (userInfo.role === 'admin') return navigate('/admin');
      if (userInfo.role === 'seller') return navigate('/seller');
      if (userInfo.role === 'field_agent') return navigate('/agent');
      if (userInfo.role === 'vendor') return navigate('/vendor');
      
      navigate('/');
    } else {
      alert(result.error || "Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="card w-96 bg-neutral text-white shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl mb-2 font-bold uppercase">
            {selectedRole.replace('_', ' ')} Login
          </h2>
          <p className="text-center text-gray-400 text-sm mb-4">Enter your credentials to continue</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control w-full">
              <label className="label"><span className="label-text text-white">Email</span></label>
              <input 
                type="email" placeholder="name@company.com" 
                className="input input-bordered w-full text-black" 
                value={email} onChange={(e) => setEmail(e.target.value)} required
              />
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text text-white">Password</span></label>
              <input 
                type="password" placeholder="••••••••" 
                className="input input-bordered w-full text-black" 
                value={password} onChange={(e) => setPassword(e.target.value)} required
              />
            </div>

            <button className="btn btn-primary w-full text-white font-bold mt-2">
              Sign In
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-300">
              New here? 
              <Link 
                to="/register" 
                state={{ role: selectedRole }} 
                className="link link-accent ml-1 font-bold"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;