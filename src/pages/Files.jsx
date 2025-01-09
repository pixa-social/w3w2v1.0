import { useState } from 'react'
import './Files.css'
import FileUpload from '../components/FileUpload'
import FileGallery from '../components/FileGallery'
import BulkOperations from '../components/BulkOperations'

export default function Files() {
  const [files, setFiles] = useState([])

  const handleUploadSuccess = (file) => {
    setFiles(prev => [...prev, {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
      timestamp: Date.now()
    }])
  }

  const handleBulkOperation = (operation, fileIds) => {
    if (operation === 'delete') {
      setFiles(prev => prev.filter(file => !fileIds.includes(file.id)))
    }
  }

  return (
    <div className="files-page">
      <section className="files-hero">
        <div className="container">
          <h1 className="hero-title">File Management</h1>
          <p className="hero-subtitle">
            Securely store and manage your files across decentralized networks
          </p>
        </div>
      </section>

      <section className="files-content">
        <div className="container">
          <FileUpload onUploadSuccess={handleUploadSuccess} />
          <BulkOperations files={files} onOperationComplete={handleBulkOperation} />
          <FileGallery files={files} />
        </div>
      </section>
    </div>
  )
}
