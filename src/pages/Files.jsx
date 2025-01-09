```jsx
import { useState, useEffect } from 'react'
import FileUpload from '../components/FileUpload'
import FileGallery from '../components/FileGallery'
import './Files.css'
import { listRedisKeys, getRedis } from '../utils/redis'

export default function Files() {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [totalStorageUsed, setTotalStorageUsed] = useState(0)

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const fileKeys = await listRedisKeys('file:*')
        const filePromises = fileKeys.map(async (key) => {
          const fileData = await getRedis(key)
          return JSON.parse(fileData)
        })
        const fetchedFiles = await Promise.all(filePromises)
        setUploadedFiles(fetchedFiles)
        const totalSize = fetchedFiles.reduce((sum, file) => sum + file.size, 0)
        setTotalStorageUsed(totalSize)
      } catch (error) {
        console.error('Error fetching files:', error)
      }
    }
    fetchFiles()
  }, [])

  const handleUploadSuccess = async (fileData) => {
    try {
      const newFile = {
        id: fileData.id,
        name: fileData.name,
        size: fileData.size,
        cid: fileData.cid,
        url: fileData.url,
        timestamp: new Date().toLocaleString(),
        type: fileData.type
      }
      await setRedis(`file:${newFile.id}`, JSON.stringify(newFile))
      setUploadedFiles(prev => [...prev, newFile])
      setTotalStorageUsed(prev => prev + fileData.size)
    } catch (error) {
      console.error('Error saving file to Redis:', error)
    }
  }

  const handleFileDelete = async (fileId) => {
    try {
      await deleteRedis(`file:${fileId}`)
      setUploadedFiles(prev => prev.filter(file => file.id !== fileId))
    } catch (error) {
      console.error('Error deleting file:', error)
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
            <FileUpload onUploadSuccess={handleUploadSuccess} />
          </div>

          <div className="file-management">
            <h2>Your Files</h2>
            <FileGallery 
              files={uploadedFiles} 
              totalStorageUsed={totalStorageUsed} 
              onDelete={handleFileDelete}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
```
