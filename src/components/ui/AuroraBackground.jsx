import React from 'react'
import './AuroraBackground.css'

export default function AuroraBackground({ children }) {
  return (
    <div className="aurora-background">
      <div className="aurora-layer aurora-layer-1"></div>
      <div className="aurora-layer aurora-layer-2"></div>
      <div className="aurora-layer aurora-layer-3"></div>
      <div className="content">
        {children}
      </div>
    </div>
  )
}
