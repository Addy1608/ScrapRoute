/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import AuthContext from "../../context/AuthContext";

const SellerDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    condition: 'Good',
    imageUrl: ''
  });

  // 1. Memoized Fetch Function
  const fetchMyProducts = useCallback(async () => {
    if (!user?._id) return;

    try {
      const userInfo = localStorage.getItem('userInfo');
      if (!userInfo) return;
      const parsedUser = JSON.parse(userInfo);
      const token = parsedUser.token;

      const { data } = await axios.get('http://localhost:5000/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const myItems = data.filter(item => 
        (item.seller?._id || item.seller) === user._id
      );
      
      setMyProducts(myItems);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  }, [user?._id]); 

  useEffect(() => {
    fetchMyProducts();
  }, [fetchMyProducts]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userInfo = localStorage.getItem('userInfo');
      const { token } = JSON.parse(userInfo);

      await axios.post('http://localhost:5000/api/products', 
        { ...formData, images: [formData.imageUrl] }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Item uploaded!');
      setFormData({ title: '', description: '', price: '', condition: 'Good', imageUrl: '' });
      fetchMyProducts();
    } catch (err) {
      alert('Upload failed');
    }
  };

  // 2. Guard Clause (Must be AFTER all Hooks)
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // 3. The Return Statement
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Seller Dashboard</h1>
          <p className="text-gray-500">Welcome, {user.name}</p>
        </div>
        <button onClick={logout} className="btn btn-sm btn-error text-white">Logout</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4">Add New Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" placeholder="Title" required className="input input-bordered w-full"
                value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
              <input 
                type="number" placeholder="Price" required className="input input-bordered w-full"
                value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
              <select 
                className="select select-bordered w-full" value={formData.condition}
                onChange={(e) => setFormData({...formData, condition: e.target.value})}
              >
                <option>New</option><option>Good</option><option>Fair</option>
              </select>
              <input 
                type="text" placeholder="Image Link" className="input input-bordered w-full"
                value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              />
              <textarea 
                placeholder="Description" className="textarea textarea-bordered w-full"
                value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
              <button type="submit" className="btn btn-primary w-full text-white">Post Item</button>
            </form>
          </div>
        </div>

        {/* Listings Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <table className="table w-full">
              <thead className="bg-gray-100">
                <tr><th>Product</th><th>Price</th><th>Status</th></tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="3" className="text-center py-4 text-gray-400">Loading...</td></tr>
                ) : myProducts.length > 0 ? (
                  myProducts.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td>{item.title}</td>
                      <td className="font-bold">₹{item.price}</td>
                      <td>
                        <span className={`badge badge-sm font-semibold ${
                          item.verificationStatus === 'verified' ? 'badge-success text-white' : 'badge-warning'
                        }`}>
                          {item.verificationStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3" className="text-center py-10 text-gray-400">No items found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ); // This closing ); matches the return (
};

export default SellerDashboard;