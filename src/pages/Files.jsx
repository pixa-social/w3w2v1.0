```jsx
import { useState, useEffect } from 'react'
import FileUpload from '../components/FileUpload'
import FileGallery from '../components/FileGallery'
import './Files.css'
import { listRedisKeys, getRedis, setRedis, deleteRedis } from '../utils/redis'
import { uploadFile, getFileUrl } from '../utils/pinata'

export default function Files() {
  const [localFiles, setLocalFiles] = useState([])
  const [pinataFiles, setPinataFiles] = useState([])
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
        setLocalFiles(fetchedFiles.filter(file => !file.isStored))
        setPinataFiles(fetchedFiles.filter(file => file.isStored))
        const totalSize = fetchedFiles.reduce((sum, file) => sum + file.size, 0)
        setTotalStorageUsed(totalSize)
      } catch (error) {
        console.error('Error fetching files:', error)
      }
    }
    fetchFiles()
  }, [])

  const handleLocalUpload = async (file) => {
    const newFile = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      timestamp: new Date().toLocaleString(),
      isStored: false
    }
    try {
      await setRedis(`file:${newFile.id}`, JSON.stringify(newFile))
      setLocalFiles(prev => [...prev, newFile])
    } catch (error) {
      console.error('Error saving file to Redis:', error)
    }
  }

  const handlePinataUpload = async (fileId) => {
    const fileToUpload = localFiles.find(file => file.id === fileId)
    if (!fileToUpload) return

    try {
      const response = await uploadFile(fileToUpload, (progress) => {
        // You might want to show upload progress here
      })
      
      const url = await getFileUrl(response.cid)

      const updatedFile = {
        ...fileToUpload,
        cid: response.cid,
        url: url,
        isStored: true
      }

      await setRedis(`file:${fileId}`, JSON.stringify(updatedFile))
      setLocalFiles(prev => prev.map(file => file.id === fileId ? updatedFile : file))
      setPinataFiles(prev => [...prev, updatedFile])
      setTotalStorageUsed(prev => prev + fileToUpload.size)
    } catch (error) {
      console.error('Error uploading to Pinata:', error)
      // Handle error, maybe show a message to the user
    }
  }

  const handleFileDelete = async (fileId) => {
    try {
      await deleteRedis(`file:${fileId}`)
      setLocalFiles(prev => prev.filter(file => file.id !== fileId))
      setPinataFiles(prev => prev.filter(file => file.id !== fileId))
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
            <FileUpload onUploadSuccess={handleLocalUpload} />
          </div>

          <div className="file-management">
            <h2>Your Files</h2>
            <FileGallery 
              files={[...localFiles, ...pinataFiles]} 
              totalStorageUsed={totalStorageUsed} 
              onDelete={handleFileDelete}
              onPinataUpload={handlePinataUpload}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
```
