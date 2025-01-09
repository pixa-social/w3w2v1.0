import React from 'react'
import Image from 'next/image'
import { FaFile, FaTrash } from 'react-icons/fa'

export default function FileGallery({ files, totalStorageUsed, onDelete }) {
  return (
    <div className="container mx-auto">
      <div className="text-center mb-4">
        <p className="text-gray-400">Total Storage Used: {(totalStorageUsed / (1024 * 1024)).toFixed(2)} MB</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {files.map(file => (
          <div key={file.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48 w-full">
              {file.type.startsWith('image/') ? (
                <Image 
                  src={file.url} 
                  alt={file.name} 
                  layout="fill" 
                  objectFit="cover" 
                  className="rounded-t-lg"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-6xl text-gray-500">
                  <FaFile />
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 truncate">{file.name}</h3>
              <p className="text-sm text-gray-400 mb-2">{(file.size / 1024).toFixed(2)} KB</p>
              <p className="text-xs text-gray-500 mb-4">Uploaded: {file.timestamp}</p>
              <div className="flex justify-between items-center">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  View
                </a>
                <button 
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  onClick={() => onDelete(file.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
