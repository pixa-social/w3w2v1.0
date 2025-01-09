import { useState } from 'react'
import './FileMetadataEditor.css'

export default function FileMetadataEditor({ file, onSave }) {
  const [metadata, setMetadata] = useState({
    name: file.name,
    description: '',
    tags: ''
  })

  const handleSave = () => {
    onSave({
      ...file,
      ...metadata
    })
  }

  return (
    <div className="metadata-editor">
      <h3>Edit File Metadata</h3>
      <div className="form-group">
        <label>File Name</label>
        <input
          type="text"
          value={metadata.name}
          onChange={(e) => setMetadata({...metadata, name: e.target.value})}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={metadata.description}
          onChange={(e) => setMetadata({...metadata, description: e.target.value})}
        />
      </div>
      <div className="form-group">
        <label>Tags</label>
        <input
          type="text"
          value={metadata.tags}
          onChange={(e) => setMetadata({...metadata, tags: e.target.value})}
        />
      </div>
      <button
        onClick={handleSave}
        className="button button-primary"
      >
        Save Metadata
      </button>
    </div>
  )
}
