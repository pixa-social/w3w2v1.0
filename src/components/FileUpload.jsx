import { useState } from 'react'
import './FileUpload.css'

export default function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setError(null)
  }

  const handleUpload = () => {
    if (!file) {
      setError('Please select a file to upload')
      return
    }

    onUploadSuccess(file)
    setFile(null)
  }

  return (
    <div className="file-upload-container">
      <div className="upload-controls">
        <input 
          type="file"
          id="file-upload"
          onChange={handleFileChange}
        />
        <button 
          onClick={handleUpload}
          disabled={!file}
          className="upload-button"
        >
          Upload
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  )
}
