import { XamanAuth } from '../services/xamanAuth';

export default function Header() {
  const handleLogout = async () => {
    await XamanAuth.logout();
    window.location.href = '/';
  };

  return (
    <header>
      {/* Existing header content */}
      {XamanAuth.isAuthenticated() ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </header>
  );
}
