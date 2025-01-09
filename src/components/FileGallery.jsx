import React from 'react'
import './FileGallery.css'

export default function FileGallery({ files, totalStorageUsed, onDelete, onPinataUpload }) {
  const getStorageType = (file) => {
    return file.isStored ? 'Web3 (Pinata)' : 'Web2 (Local)'
  }

  return (
    <div className="file-gallery">
      <div className="storage-usage">
        <p>Total Storage Used: {(totalStorageUsed / (1024 * 1024)).toFixed(2)} MB</p>
      </div>
      <div className="gallery-grid">
        {files.map(file => (
          <div key={file.id} className={`gallery-item ${file.isStored ? 'web3' : 'web2'}`}>
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
              <p>Storage: {getStorageType(file)}</p>
              {file.isStored && (
                <p>
                  <strong>CID:</strong> {file.cid}
                </p>
              )}
            </div>
            <div className="file-actions">
              {!file.isStored && (
                <button 
                  className="button button-secondary"
                  onClick={() => onPinataUpload(file.id)}
                >
                  Store on Pinata
                </button>
              )}
              <button 
                className="button button-secondary"
                onClick={() => onDelete(file.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}