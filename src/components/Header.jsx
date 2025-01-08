import { Link } from 'react-router-dom'
import './Header.css'
import { useState } from 'react'

export default function Header() {
  const [userType, setUserType] = useState(localStorage.getItem('userType'))

  const handleLogout = () => {
    localStorage.removeItem('userType')
    localStorage.removeItem('xummAccount')
    setUserType(null)
    window.location.href = '/'
  }

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <img 
            src="https://ghostcoin.network/wp-content/uploads/2024/03/bigger-one.png" 
            alt="Ghost Network" 
            className="logo-img" 
          />
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/bridge" className="nav-link">Bridge</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/docs" className="nav-link">Docs</Link>
        </nav>
        <div className="header-buttons">
          {userType ? (
            <>
              {userType === 'admin' && (
                <Link to="/admin-dashboard" className="button button-secondary admin-preview">
                  Admin Dashboard
                </Link>
              )}
              <Link to="/dashboard" className="button button-secondary">
                Dashboard
              </Link>
              <button 
                className="button button-secondary logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="button button-secondary">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
