
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from "../../context/AuthContext";
const VendorDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [inventory, setInventory] = useState([]);
  const [stats, setStats] = useState({ totalWeight: 0, itemsProcessed: 0 });

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        
        // Fetch items delivered to this vendor
        const { data } = await axios.get('http://localhost:5000/api/vendor/inventory', config);
        setInventory(data);
        
        // Calculate basic stats
        const weight = data.reduce((acc, item) => acc + (item.weight || 0), 0);
        setStats({ totalWeight: weight, itemsProcessed: data.length });
      } catch (err) {
        console.error("Error fetching vendor data", err);
      }
    };
    fetchVendorData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Top Navigation Bar */}
      <div className="flex justify-between items-center mb-8 bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Vendor Management</h1>
          <p className="text-slate-500 text-sm font-medium">Partner: {user?.name}</p>
        </div>
        <button onClick={logout} className="btn btn-outline btn-error btn-sm">Logout</button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="stats shadow bg-white border border-slate-100">
          <div className="stat">
            <div className="stat-title text-slate-500">Total Weight Processed</div>
            <div className="stat-value text-green-700">{stats.totalWeight} kg</div>
            <div className="stat-desc text-slate-400 font-medium">Verified by Field Agents</div>
          </div>
        </div>
        <div className="stats shadow bg-white border border-slate-100">
          <div className="stat">
            <div className="stat-title text-slate-500">Inventory Count</div>
            <div className="stat-value text-slate-800">{stats.itemsProcessed} Units</div>
            <div className="stat-desc text-slate-400 font-medium">Awaiting Recycling</div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Received E-Waste Inventory</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-slate-50">
              <tr className="text-slate-600">
                <th>Product</th>
                <th>Category</th>
                <th>Weight (kg)</th>
                <th>Received Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {inventory.length > 0 ? inventory.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                  <td className="font-semibold">{item.name}</td>
                  <td><span className="badge badge-ghost font-medium">{item.category}</span></td>
                  <td>{item.weight || 'N/A'}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className="badge badge-success text-white font-bold p-3">Verified</span>
                  </td>
                </tr>
              ) ) : (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-slate-400 italic">
                    No inventory items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;