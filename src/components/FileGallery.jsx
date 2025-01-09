import { useState } from 'react'
import './FileGallery.css'
import FilePreview from './FilePreview'
import FileMetadataEditor from './FileMetadataEditor'
import FileSharing from './FileSharing'

export default function FileGallery({ files }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [showMetadataEditor, setShowMetadataEditor] = useState(false)

  const handleFileSelect = (file) => {
    setSelectedFile(file)
    setShowMetadataEditor(false)
  }

  const handleMetadataSave = (updatedFile) => {
    setSelectedFile(updatedFile)
    setShowMetadataEditor(false)
  }

  return (
    <div className="file-gallery">
      <div className="storage-usage">
        Storage Used: {files.reduce((sum, file) => sum + file.size, 0) / 1024} KB
      </div>

      <div className="gallery-grid">
        {files.map(file => (
          <div 
            key={file.id} 
            className={`gallery-item ${file.cid ? 'web3' : 'web2'}`}
            onClick={() => handleFileSelect(file)}
          >
            <div className="file-preview">
              {file.type.startsWith('image/') ? (
                <img src={file.cid ? `https://ipfs.io/ipfs/${file.cid}` : URL.createObjectURL(file)} alt={file.name} />
              ) : (
                <div className="file-icon">📄</div>
              )}
            </div>
            <div className="file-details">
              <h3>{file.name}</h3>
              <p>{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>
        ))}
      </div>

      {selectedFile && (
        <div className="file-details-modal">
          <FilePreview file={selectedFile} />
          <div className="file-actions">
            <button 
              className="button button-secondary"
              onClick={() => setShowMetadataEditor(!showMetadataEditor)}
            >
              Edit Metadata
            </button>
          </div>
          
          {showMetadataEditor && (
            <FileMetadataEditor 
              file={selectedFile} 
              onSave={handleMetadataSave}
            />
          )}
          
          <FileSharing file={selectedFile} />
        </div>
      )}
    </div>
  )
}
