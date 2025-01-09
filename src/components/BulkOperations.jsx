import { useState } from 'react'
import './BulkOperations.css'

export default function BulkOperations({ files, onOperationComplete }) {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [operation, setOperation] = useState('')

  const handleSelectFile = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    )
  }

  const handleBulkOperation = async () => {
    try {
      if (operation === 'delete') {
        // Perform delete operation
        onOperationComplete('delete', selectedFiles)
      } else if (operation === 'download') {
        // Perform download operation
        onOperationComplete('download', selectedFiles)
      }
      setSelectedFiles([])
      setOperation('')
    } catch (error) {
      console.error('Bulk operation failed:', error)
    }
  }

  return (
    <div className="bulk-operations">
      <h3>Bulk Operations</h3>
      <div className="operation-controls">
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="">Select Operation</option>
          <option value="delete">Delete</option>
          <option value="download">Download</option>
        </select>
        <button
          onClick={handleBulkOperation}
          disabled={!operation || selectedFiles.length === 0}
          className="button button-primary"
        >
          Execute
        </button>
      </div>
    </div>
  )
}
