import { useState } from 'react'
import FileUpload from '../components/FileUpload'
import FileGallery from '../components/FileGallery'

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

  const handleFileDelete = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <section className="py-12 bg-gradient-to-r from-purple-500 to-indigo-500">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Your Files</h1>
          <p className="text-lg text-gray-200">
            Upload, manage, and store your files across multiple networks
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Upload a File</h2>
            <FileUpload onUploadSuccess={handleUploadSuccess} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Files</h2>
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
