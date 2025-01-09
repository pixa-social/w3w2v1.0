import { useState } from 'react'
import './FileSharing.css'

export default function FileSharing({ file }) {
  const [shareLink, setShareLink] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  const generateShareLink = async () => {
    try {
      const link = `https://ghost.network/share/${file.cid}`
      setShareLink(link)
      setIsCopied(false)
    } catch (error) {
      console.error('Error generating share link:', error)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink)
    setIsCopied(true)
  }

  return (
    <div className="file-sharing">
      <h3>Share this File</h3>
      <div className="share-controls">
        <button 
          onClick={generateShareLink}
          className="button button-primary"
        >
          Generate Share Link
        </button>
        
        {shareLink && (
          <div className="share-link">
            <input
              type="text"
              value={shareLink}
              readOnly
            />
            <button
              onClick={copyToClipboard}
              className="button button-secondary"
            >
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
