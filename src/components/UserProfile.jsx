import './UserProfile.css'
import { setRedis } from '../utils/redis'

export default function UserProfile({ xrpAddress }) {
  const handleUserLogin = async () => {
    const user = {
      id: Date.now().toString(),
      xrpAddress: xrpAddress,
      storageUsed: 0,
      storageLimit: 1024 * 1024 * 10 // 10 MB default limit
    }
    await setRedis(`user:${user.id}`, JSON.stringify(user))
  }

  useEffect(() => {
    handleUserLogin()
  }, [])

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="profile-info">
        <p><strong>XRP Address:</strong> {xrpAddress}</p>
        {/* Add more user details here */}
      </div>
    </div>
  )
}
