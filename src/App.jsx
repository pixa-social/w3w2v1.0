import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Bridge from './pages/Bridge'
import NetworkSelection from './pages/NetworkSelection'
import Admin from './pages/Admin'
import Dashboard from './pages/Dashboard'
import Files from './pages/Files'
import NetworkStatus from './pages/NetworkStatus'
import Settings from './pages/Settings'
import AdminDashboard from './pages/AdminDashboard'
import About from './pages/About'
import './App.css'

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const userType = localStorage.getItem('userType')
  
  if (!userType) {
    return <Navigate to="/login" />
  }

  if (isAdmin && userType !== 'admin') {
    return <Navigate to="/dashboard" />
  }

  return children
}

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bridge" element={<Bridge />} />
            <Route path="/login" element={<NetworkSelection />} />
            <Route path="/admin" element={
              <ProtectedRoute isAdmin>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/files" element={
              <ProtectedRoute>
                <Files />
              </ProtectedRoute>
            } />
            <Route path="/network-status" element={
              <ProtectedRoute>
                <NetworkStatus />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/admin-dashboard" element={
              <ProtectedRoute isAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
