/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import AuthContext from "../../context/AuthContext";

const FieldAgentDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch pickups assigned to this specific agent
  const fetchPickups = useCallback(async () => {
    if (!user?._id) return;
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const { data } = await axios.get('http://localhost:5000/api/pickups/my-tasks', {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      setPickups(data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  useEffect(() => {
    fetchPickups();
  }, [fetchPickups]);

  // 2. Update status (e.g., from 'Assigned' to 'Picked Up')
  const updateStatus = async (id, status) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      await axios.put(`http://localhost:5000/api/pickups/${id}`, 
        { status }, 
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      fetchPickups(); // Refresh list
    } catch (err) {
      alert("Status update failed");
    }
  };

  if (!user) return <div className="p-10 text-center">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Field Agent Panel</h1>
          <p className="text-gray-500 font-medium">Agent: {user.name}</p>
        </div>
        <button onClick={logout} className="btn btn-sm btn-error text-white">Logout</button>
      </div>

      {/* Task List */}
      <div className="grid grid-cols-1 gap-4">
        <h2 className="text-xl font-bold text-gray-700">My Assigned Pickups</h2>
        
        {loading ? (
          <div className="text-center py-10"><span className="loading loading-dots loading-lg"></span></div>
        ) : pickups.length > 0 ? (
          pickups.map((task) => (
            <div key={task._id} className="card bg-white shadow-md border-l-4 border-primary">
              <div className="card-body p-4 flex-row justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{task.productName}</h3>
                  <p className="text-sm text-gray-500">📍 {task.address}</p>
                  <p className="text-xs text-gray-400 mt-1 italic">Customer: {task.customerName}</p>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <span className={`badge font-bold p-3 ${
                    task.status === 'completed' ? 'badge-success text-white' : 'badge-warning'
                  }`}>
                    {task.status}
                  </span>
                  
                  {task.status !== 'completed' && (
                    <button 
                      onClick={() => updateStatus(task._id, 'completed')}
                      className="btn btn-xs btn-primary text-white"
                    >
                      Mark Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-10 rounded-xl text-center text-gray-400">
            No pickups assigned to you yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldAgentDashboard;