import React, { useState, useEffect } from 'react'
import { PinataSDK } from 'pinata'
import { setRedis, getRedis, listRedisKeys, deleteRedis } from '../utils/redis'
import './Files.css'

const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_PINATA_JWT,
  pinataGateway: import.meta.env.VITE_PINATA_GATEWAY
})

export default function Files() {
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const fileKeys = await listRedisKeys('file:*')
        const filePromises = fileKeys.map(async (key) => {
          const fileData = await getRedis(key)
          return JSON.parse(fileData)
        })
        const fetchedFiles = await Promise.all(filePromises)
        setFiles(fetchedFiles)
      } catch (error) {
        console.error('Error fetching files:', error)
        setError('Failed to fetch files')
      }
    }
    fetchFiles()
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      uploadFile(file)
    }
  }

  const uploadFile = async (file) => {
    setUploading(true)
    setError(null)
    setUploadProgress(0)

    try {
      // Store file locally in Redis
      const newFile = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        timestamp: new Date().toLocaleString(),
        isStored: false
      }
      await setRedis(`file:${newFile.id}`, JSON.stringify(newFile))
      setFiles(prev => [...prev, newFile])

      // Upload to Pinata
      const response = await pinata.upload.file(file, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          setUploadProgress(percentCompleted)
        }
      })

      const url = await pinata.gateways.createSignedURL({
        cid: response.cid,
        expires: 3600 // 1 hour expiration
      })

      const updatedFile = {
        ...newFile,
        cid: response.cid,
        url: url,
        isStored: true
      }

      await setRedis(`file:${newFile.id}`, JSON.stringify(updatedFile))
      setFiles(prev => prev.map(file => file.id === newFile.id ? updatedFile : file))
    } catch (error) {
      console.error('Error uploading file:', error)
      setError('Failed to upload file')
    } finally {
      setUploading(false)
    }
  }

  const handleFileDelete = async (fileId) => {
    try {
      await deleteRedis(`file:${fileId}`)
      setFiles(prev => prev.filter(file => file.id !== fileId))
    } catch (error) {
      console.error('Error deleting file:', error)
      setError('Failed to delete file')
    }
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
            <input 
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              disabled={uploading}
            />
            {uploading && (
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            )}
            {error && <div className="error-message">{error}</div>}
          </div>

          <div className="file-management">
            <h2>Your Files</h2>
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
                    <p>Storage: {file.isStored ? 'Web3 (Pinata)' : 'Web2 (Local)'}</p>
                    {file.isStored && (
                      <p>
                        <strong>CID:</strong> {file.cid}
                      </p>
                    )}
                  </div>
                  <div className="file-actions">
                    <button 
                      className="button button-secondary"
                      onClick={() => handleFileDelete(file.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
