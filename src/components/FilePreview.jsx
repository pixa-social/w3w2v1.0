import React, { useState } from 'react';
import './FilePreview.css';

const FilePreview = ({ file }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const getPreviewContent = () => {
    if (!file) return null;

    const fileType = file.type.split('/')[0];
    const previewUrl = file.cid ? `https://ipfs.io/ipfs/${file.cid}` : URL.createObjectURL(file);

    switch (fileType) {
      case 'image':
        return (
          <img 
            src={previewUrl} 
            alt={file.name} 
            className={`preview-image ${isFullscreen ? 'fullscreen' : ''}`}
          />
        );
      case 'video':
        return (
          <video controls className="preview-video">
            <source src={previewUrl} type={file.type} />
            Your browser does not support the video tag.
          </video>
        );
      case 'audio':
        return (
          <audio controls className="preview-audio">
            <source src={previewUrl} type={file.type} />
            Your browser does not support the audio element.
          </audio>
        );
      case 'application':
        if (file.type === 'application/pdf') {
          return (
            <iframe 
              src={previewUrl}
              title={file.name}
              className="preview-pdf"
            />
          );
        }
        return <div className="preview-unsupported">Preview not available</div>;
      default:
        return <div className="preview-unsupported">Preview not available</div>;
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`file-preview-container ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="preview-controls">
        <button 
          onClick={toggleFullscreen}
          className="fullscreen-button"
        >
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>
      <div className="preview-content">
        {getPreviewContent()}
      </div>
      <div className="file-info">
        <h3>{file?.name}</h3>
        <p>Size: {(file?.size / 1024).toFixed(2)} KB</p>
        {file?.cid && <p>CID: {file.cid}</p>}
      </div>
    </div>
  );
};

export default FilePreview;
