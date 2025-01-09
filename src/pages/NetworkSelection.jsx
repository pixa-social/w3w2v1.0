import './NetworkSelection.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function NetworkSelection() {
  const [xumm, setXumm] = useState(null)
  const [adminUsername, setAdminUsername] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Initialize XUMM SDK
  useEffect(() => {
    const initializeXumm = async () => {
      try {
        // Load XUMM SDK
        const script = document.createElement('script')
        script.src = 'https://xumm.app/assets/cdn/xumm.min.js'
        script.onload = () => {
          const xummInstance = new Xumm('67a2aa88-eb11-4f8e-8bf6-15e829cb254e', '2fbdfe66-2c4c-4974-bc83-00356b901477')
          setXumm(xummInstance)

          // Handle successful login
          xummInstance.on('success', async () => {
            try {
              const account = await xummInstance.user.account
              if (account) {
                localStorage.setItem('userType', 'user')
                localStorage.setItem('xummAccount', account)
                navigate('/dashboard')
              }
            } catch (error) {
              console.error('XUMM account error:', error)
              setError('Failed to fetch account details')
            }
          })

          // Handle logout
          xummInstance.on('logout', () => {
            localStorage.removeItem('userType')
            localStorage.removeItem('xummAccount')
            navigate('/')
          })

          // Handle errors
          xummInstance.on('error', (error) => {
            console.error('XUMM error:', error)
            setError('XUMM connection failed')
          })
        }
        document.body.appendChild(script)
      } catch (error) {
        console.error('XUMM initialization error:', error)
        setError('Failed to initialize XUMM SDK')
      }
    }

    initializeXumm()

    return () => {
      if (xumm) {
        xumm.off('success')
        xumm.off('logout')
        xumm.off('error')
      }
    }
  }, [])

  // Handle XUMM login
  const handleXummConnect = () => {
    if (xumm) {
      try {
        xumm.authorize()
      } catch (error) {
        console.error('XUMM authorization error:', error)
        setError('Failed to start XUMM authorization')
      }
    } else {
      setError('XUMM SDK not loaded')
    }
  }

  // Handle admin login
  const handleAdminLogin = (e) => {
    e.preventDefault()
    if (adminUsername === 'root' && adminPassword === 'hellprince!@#$') {
      localStorage.setItem('userType', 'admin')
      navigate('/admin-dashboard')
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="network-selection">
      <div className="container">
        <div className="selection-content">
          <h1 className="title">Login to Ghost Network</h1>
          <p className="subtitle">
            Choose your login method to access the Ghost Network
          </p>

          {error && <p className="error-message">{error}</p>}

          <div className="login-options">
            {/* XUMM User Login */}
            <div className="login-card">
              <h2>User Login</h2>
              <img 
                src="https://embed.zenn.studio/api/optimize-og-image/66630b79817fc5295f53/https%3A%2F%2Fcdn.prod.website-files.com%2F66ffb9c73bc7e83a1e0e1006%2F6706a7c9fa5535a8976ea20d_nav.webp" 
                alt="XUMM Logo" 
                className="xumm-logo"
              />
              <p>Connect with your XUMM Wallet</p>
              <button 
                className="select-button"
                onClick={handleXummConnect}
              >
                Connect with XUMM
              </button>
            </div>

            {/* Admin Login */}
            <div className="login-card">
              <h2>Admin Login</h2>
              <form onSubmit={handleAdminLogin}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="select-button admin">
                  Admin Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
