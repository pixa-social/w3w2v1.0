import { useState } from 'react'
import './NetworkSelection.css'
import { XamanAuth } from '../services/xamanAuth'

export default function NetworkSelection() {
  const [selectedNetwork, setSelectedNetwork] = useState('xrpl')
  const [isConnecting, setIsConnecting] = useState(false)

  const handleNetworkSelect = async () => {
    try {
      setIsConnecting(true)
      
      if (selectedNetwork === 'xrpl') {
        await XamanAuth.connect()
      } else {
        // Handle other network connections
      }
      
      window.location.href = '/dashboard'
    } catch (error) {
      console.error('Network connection error:', error)
      alert('Failed to connect to network')
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="network-selection">
      <h1>Select Network</h1>
      
      <div className="network-options">
        <div 
          className={`network-card ${selectedNetwork === 'xrpl' ? 'active' : ''}`}
          onClick={() => setSelectedNetwork('xrpl')}
        >
          <img src="/src/assets/xumm-logo.png" alt="XRP Ledger" />
          <h2>XRP Ledger</h2>
          <p>Connect via Xaman Wallet</p>
        </div>

        <div 
          className={`network-card ${selectedNetwork === 'ipfs' ? 'active' : ''}`}
          onClick={() => setSelectedNetwork('ipfs')}
        >
          <img src="/src/assets/ghost-logo.png" alt="IPFS" />
          <h2>IPFS Network</h2>
          <p>Decentralized storage</p>
        </div>
      </div>

      <button 
        onClick={handleNetworkSelect}
        disabled={isConnecting}
        className="connect-button"
      >
        {isConnecting ? 'Connecting...' : 'Connect'}
      </button>
    </div>
  )
}
