import './Home.css'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to <span className="gradient-text">Ghost Network</span>
            </h1>
            <p className="hero-subtitle">
              Decentralized storage solution bridging Web2 and Web3
            </p>
            <div className="hero-actions">
              <Link to="/bridge" className="button button-primary">
                Get Started
              </Link>
              <Link to="/about" className="button button-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Decentralized Storage</h3>
              <p>Store files across multiple decentralized networks</p>
            </div>
            <div className="feature-card">
              <h3>End-to-End Encryption</h3>
              <p>Military-grade encryption for your files</p>
            </div>
            <div className="feature-card">
              <h3>Cross-Chain Support</h3>
              <p>Works with multiple blockchain networks</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
