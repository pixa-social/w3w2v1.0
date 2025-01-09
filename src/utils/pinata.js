```js
import { PinataSDK } from 'pinata'

const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_PINATA_JWT,
  pinataGateway: import.meta.env.VITE_PINATA_GATEWAY
})

const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second

const handleError = (error, operation) => {
  console.error(`Error during ${operation}:`, error)
  if (error.response) {
    console.error('Response Status:', error.response.status)
    console.error('Response Data:', error.response.data)
  }
  throw error
}

const checkRateLimit = async () => {
  try {
    const rateLimit = await pinata.rateLimit()
    if (rateLimit.remaining === 0) {
      console.warn('Rate limit reached. Waiting for reset.')
      await new Promise(resolve => setTimeout(resolve, rateLimit.reset * 1000))
    }
  } catch (error) {
    handleError(error, 'rate limit check')
  }
}

const retryOperation = async (operation, retries = 0) => {
  try {
    await checkRateLimit()
    return await operation()
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.log(`Retrying ${operation.name} in ${RETRY_DELAY / 1000} seconds...`)
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
      return retryOperation(operation, retries + 1)
    }
    throw error
  }
}

export const uploadFile = async (file, onProgress) => {
  const uploadOperation = async () => {
    try {
      const response = await pinata.upload.file(file, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          onProgress(percentCompleted)
        }
      })
      return response
    } catch (error) {
      handleError(error, 'file upload')
    }
  }
  return retryOperation(uploadOperation)
}

export const getFileUrl = async (cid) => {
  const getUrlOperation = async () => {
    try {
      const url = await pinata.gateways.createSignedURL({
        cid,
        expires: 3600 // 1 hour expiration
      })
      return url
    } catch (error) {
      handleError(error, 'file URL retrieval')
    }
  }
  return retryOperation(getUrlOperation)
}
```
