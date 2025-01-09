import './AdminDashboard.css'
import { useState, useEffect } from 'react'
import { listRedisKeys, getRedis } from '../utils/redis'

export default function AdminDashboard() {
  const [users, setUsers] = useState([])
  const [newStorageLimit, setNewStorageLimit] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      const userKeys = await listRedisKeys('user:*')
      const userPromises = userKeys.map(async (key) => {
        const userData = await getRedis(key)
        return JSON.parse(userData)
      })
      const fetchedUsers = await Promise.all(userPromises)
      setUsers(fetchedUsers)
    }
    fetchUsers()
  }, [])

  const handleStorageLimitChange = (e, userId) => {
    setNewStorageLimit(e.target.value)
  }

  const adjustStorageLimit = async (userId) => {
    const user = users.find(user => user.id === userId)
    if (user) {
      user.storageLimit = parseInt(newStorageLimit) * 1024 * 1024
      await setRedis(`user:${userId}`, JSON.stringify(user))
      setUsers(users.map(u => u.id === userId ? user : u))
    }
    setNewStorageLimit('')
  }

  const deleteUser = async (userId) => {
    await deleteRedis(`user:${userId}`)
    setUsers(users.filter(user => user.id !== userId))
  }

  return (
    <div className="admin-dashboard">
      <section className="admin-hero">
        <div className="container">
          <h1 className="hero-title">Admin Dashboard</h1>
          <p className="hero-subtitle">
            Manage wallet configurations, storage options, user roles, API settings, and user accounts.
          </p>
        </div>
      </section>

      <section className="admin-content">
        <div className="container">
          <div className="admin-grid">
            {/* Previous admin cards */}
            <div className="admin-card">
              <h3>User Management</h3>
              <div className="user-management">
                <p>Total Users: {users.length}</p>
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>User ID</th>
                      <th>XRP Address</th>
                      <th>Storage Used</th>
                      <th>Storage Limit</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.xrpAddress}</td>
                        <td>{(user.storageUsed / (1024 * 1024)).toFixed(2)} MB</td>
                        <td>
                          <input 
                            type="number" 
                            value={newStorageLimit || (user.storageLimit / (1024 * 1024)).toFixed(2)} 
                            onChange={(e) => handleStorageLimitChange(e, user.id)}
                            placeholder="New Limit (MB)"
                          />
                          <button 
                            className="button button-secondary" 
                            onClick={() => adjustStorageLimit(user.id)}
                          >
                            Adjust
                          </button>
                        </td>
                        <td>
                          <button 
                            className="button button-secondary" 
                            onClick={() => deleteUser(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
