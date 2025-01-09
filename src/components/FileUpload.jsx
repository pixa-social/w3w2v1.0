import { useState } from 'react'
import { uploadFile } from '../utils/pinata'
import './FileUpload.css'

export default function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setError(null)
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload')
      return
    }

    setIsUploading(true)
    setProgress(0)
    setError(null)

    try {
      const response = await uploadFile(file, (progress) => {
        setProgress(progress)
      })
      
      onUploadSuccess({
        ...response,
        url: await getFileUrl(response.cid),
        type: file.type
      })
      
      setFile(null)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="file-upload-container">
      <div className="upload-controls">
        <input 
          type="file"
          id="file-upload"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <button 
          onClick={handleUpload}
          disabled={isUploading || !file}
          className="upload-button"
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {isUploading && (
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
    </div>
  )
}
