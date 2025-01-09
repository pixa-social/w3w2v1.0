import { Link } from 'react-router-dom'
import './Header.css'
import { XamanAuth } from '../services/xamanAuth'

export default function Header() {
  const isAuthenticated = XamanAuth.isAuthenticated()
  const isAdmin = localStorage.getItem('userType') === 'admin'

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <img 
            src="/src/assets/ghost-logo.png" 
            alt="Ghost Network" 
            className="logo-img"
          />
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/bridge" className="nav-link">Bridge</Link>
          <Link to="/files" className="nav-link">Files</Link>
          {isAdmin && <Link to="/admin" className="nav-link">Admin</Link>}
        </nav>

        <div className="header-buttons">
          {isAuthenticated ? (
            <button 
              onClick={() => {
                XamanAuth.logout()
                window.location.href = '/'
              }}
              className="button logout"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="button button-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
