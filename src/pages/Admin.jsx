import { useState } from 'react'
import './Admin.css'

export default function Admin() {
  const [apiKeys, setApiKeys] = useState({
    pinata: '',
    ipfs: '',
    filecoin: ''
  })

  const handleSave = async () => {
    try {
      // Save API keys to localStorage
      localStorage.setItem('apiKeys', JSON.stringify(apiKeys))
      alert('API keys saved successfully')
    } catch (error) {
      console.error('Error saving API keys:', error)
      alert('Failed to save API keys')
    }
  }

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      
      <div className="api-keys-section">
        <h2>API Key Management</h2>
        
        <div className="api-key-input">
          <label>Pinata API Key:</label>
          <input 
            type="text"
            value={apiKeys.pinata}
            onChange={(e) => setApiKeys({...apiKeys, pinata: e.target.value})}
          />
        </div>

        <div className="api-key-input">
          <label>IPFS API Key:</label>
          <input 
            type="text"
            value={apiKeys.ipfs}
            onChange={(e) => setApiKeys({...apiKeys, ipfs: e.target.value})}
          />
        </div>

        <div className="api-key-input">
          <label>Filecoin API Key:</label>
          <input 
            type="text"
            value={apiKeys.filecoin}
            onChange={(e) => setApiKeys({...apiKeys, filecoin: e.target.value})}
          />
        </div>

        <button onClick={handleSave} className="save-button">
          Save API Keys
        </button>
      </div>
    </div>
  )
}
