import './UserProfile.css'

export default function UserProfile({ xrpAddress }) {
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
