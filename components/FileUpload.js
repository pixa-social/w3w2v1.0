import { useState } from 'react'
import { PinataSDK } from 'pinata'
import { FaUpload } from 'react-icons/fa'

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY
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
    <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-300">
          Select a file to upload
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-700 rounded-md">
          <div className="space-y-1 text-center">
            <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-400">
              <label 
                htmlFor="file-upload" 
                className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <input 
                  id="file-upload" 
                  name="file-upload" 
                  type="file" 
                  className="sr-only" 
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>

      {isUploading && (
        <div className="mb-4">
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <button 
        onClick={handleUpload}
        disabled={isUploading || !file}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  )
}
