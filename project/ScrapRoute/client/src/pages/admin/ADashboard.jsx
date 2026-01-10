/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from "../../context/AuthContext";
const AdminDashboard = () => {
  // Use everything from context
  const { user, logout } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) return;
        const { token } = JSON.parse(userInfo);
        
        // axios is used here
        const { data } = await axios.get('http://localhost:5000/api/products', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(data);
      } catch (err) {
        console.error("Fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleAction = async (id, status) => {
    try {
      const userInfo = localStorage.getItem('userInfo');
      const { token } = JSON.parse(userInfo);
      await axios.put(`http://localhost:5000/api/products/${id}/verify`, 
        { status }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update local state instead of reloading
      setProducts(prev => prev.map(p => p._id === id ? { ...p, verificationStatus: status } : p));
    } catch (err) {
      alert("Action failed");
    }
  };

  // filter is used here
  const filtered = products.filter(p => filter === 'all' ? true : p.verificationStatus === filter);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        {/* user.name is used here */}
        <h1 className="text-2xl font-bold text-gray-800">Admin: {user?.name}</h1>
        <button onClick={logout} className="btn btn-sm btn-error">Logout</button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex gap-2">
          {['pending', 'verified', 'all'].map(s => (
            <button 
              key={s} 
              onClick={() => setFilter(s)} 
              className={`btn btn-xs capitalize ${filter === s ? 'btn-primary' : ''}`}
            >
              {s}
            </button>
          ))}
        </div>

        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!loading && filtered.map(item => (
              <tr key={item._id}>
                <td className="font-medium">{item.title}</td>
                <td><span className="badge badge-ghost">{item.verificationStatus}</span></td>
                <td>
                  {item.verificationStatus === 'pending' && (
                    <button onClick={() => handleAction(item._id, 'verified')} className="btn btn-xs btn-success text-white">Approve</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;