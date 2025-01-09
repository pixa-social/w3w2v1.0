import { useState } from 'react'
import FileUpload from '../components/FileUpload'
import FileGallery from '../components/FileGallery'
import './Files.css'

export default function Files() {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [totalStorageUsed, setTotalStorageUsed] = useState(0)

  const handleUploadSuccess = (fileData) => {
    setUploadedFiles(prev => [
      ...prev,
      {
        id: fileData.id,
        name: fileData.name,
        size: fileData.size,
        cid: fileData.cid,
        url: fileData.url,
        timestamp: new Date().toLocaleString(),
        type: fileData.type
      }
    ])
    setTotalStorageUsed(prev => prev + fileData.size)
  }

  return (
    <div className="files-page">
      <section className="files-hero">
        <div className="container">
          <h1 className="hero-title">Your Files</h1>
          <p className="hero-subtitle">
            Upload, manage, and store your files across multiple networks
          </p>
        </div>
      </section>

      <section className="files-content">
        <div className="container">
          <div className="file-upload-section">
            <h2>Upload a File</h2>
            <FileUpload onUploadSuccess={handleUploadSuccess} />
          </div>

          <div className="file-management">
            <h2>Your Files</h2>
            <FileGallery files={uploadedFiles} totalStorageUsed={totalStorageUsed} />
          </div>
        </div>
      </section>
    </div>
  )
}
