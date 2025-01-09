import React from 'react'
import './FileGallery.css'

export default function FileGallery({ files, totalStorageUsed }) {
  return (
    <div className="file-gallery">
      <div className="storage-usage">
        <p>Total Storage Used: {(totalStorageUsed / (1024 * 1024)).toFixed(2)} MB</p>
      </div>
      <div className="gallery-grid">
        {files.map(file => (
          <div key={file.id} className="gallery-item">
            <div className="file-preview">
              {file.type.startsWith('image/') ? (
                <img src={file.url} alt={file.name} />
              ) : (
                <div className="file-icon">{file.name.slice(-3).toUpperCase()}</div>
              )}
            </div>
            <div className="file-details">
              <h3>{file.name}</h3>
              <p>{(file.size / 1024).toFixed(2)} KB</p>
              <p>Uploaded: {file.timestamp}</p>
            </div>
            <div className="file-actions">
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary"
              >
                View
              </a>
              <button 
                className="button button-secondary"
                onClick={() => navigator.clipboard.writeText(file.cid)}
              >
                Copy CID
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
