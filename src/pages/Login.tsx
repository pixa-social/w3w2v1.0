import { useState, useEffect } from 'react';
import { XamanAuth } from '../services/xamanAuth';

export default function Login() {
  const [qrCode, setQrCode] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const initiateLogin = async () => {
      try {
        const qr = await XamanAuth.initiateLogin();
        setQrCode(qr);
        startPolling();
      } catch (err) {
        setError('Failed to initiate login');
      }
    };
    initiateLogin();
  }, []);

  const startPolling = () => {
    const interval = setInterval(async () => {
      const user = XamanAuth.getCurrentUser();
      if (user) {
        clearInterval(interval);
        window.location.href = '/dashboard';
      }
    }, 3000);
  };

  return (
    <div className="login-container">
      {qrCode ? (
        <img src={qrCode} alt="Xaman Login QR Code" />
      ) : (
        <p>Loading QR code...</p>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
