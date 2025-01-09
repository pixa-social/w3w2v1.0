import { useState } from 'react'
import { PinataSDK } from 'pinata'
import './FileUpload.css'

const pinata = new PinataSDK({
  pinataJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5ZDQwYzc2NC1hODAyLTQ0ZmUtYmNlNS0xMDllZWMzY2IzOTEiLCJlbWFpbCI6Im1hbnVrdXBwdGVsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJlYzA0MmRkNzU2YjE0ZjlmMDU5MSIsInNjb3BlZEtleVNlY3JldCI6IjFhNDI5OGExZDUyMTk3NjZjZDgzN2NjODE5ZTVmNjIxZWM3MDQ5ZDM3MTRhNTQ3NjhlMjdkNzIwYjZjM2JlNWMiLCJleHAiOjE3Njc5NTYzNjd9.SXvuzoVvTVJg7GTCrTCYt-ps6KsxQ39J2G8kdjaSGvo',
  pinataGateway: 'https://amethyst-abundant-badger-162.mypinata.cloud'
})

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
      const response = await pinata.upload.file(file, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          setProgress(percentCompleted)
        }
      })
      
      const url = await pinata.gateways.createSignedURL({
        cid: response.cid,
        expires: 3600 // 1 hour expiration
      })

      onUploadSuccess({
        ...response,
        url: url
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
