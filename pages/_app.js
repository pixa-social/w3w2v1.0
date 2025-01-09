import '../styles/globals.css'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // This is where you can add any global initialization code
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
