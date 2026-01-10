import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; // Adjust path if necessary

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>MyAuthApp</Link>
      </div>

      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        
        {user ? (
          <>
            <li style={styles.userInfo}>Welcome, **{user.name || 'User'}**</li>
            <li>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login" style={styles.link}>Login</Link></li>
            <li><Link to="/register" style={styles.link}>Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

// Simple inline styles for demonstration
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#333',
    color: '#fff',
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    gap: '20px',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  userInfo: {
    fontSize: '0.9rem',
    color: '#ccc',
  },
  logoutBtn: {
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    padding: '5px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};

export default Navbar;