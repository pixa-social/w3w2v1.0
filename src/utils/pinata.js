import { PinataSDK } from 'pinata'

const pinata = new PinataSDK({
  pinataJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5ZDQwYzc2NC1hODAyLTQ0ZmUtYmNlNS0xMDllZWMzY2IzOTEiLCJlbWFpbCI6Im1hbnVrdXBwdGVsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJlYzA0MmRkNzU2YjE0ZjlmMDU5MSIsInNjb3BlZEtleVNlY3JldCI6IjFhNDI5OGExZDUyMTk3NjZjZDgzN2NjODE5ZTVmNjIxZWM3MDQ5ZDM3MTRhNTQ3NjhlMjdkNzIwYjZjM2JlNWMiLCJleHAiOjE3Njc5NTYzNjd9.SXvuzoVvTVJg7GTCrTCYt-ps6KsxQ39J2G8kdjaSGvo',
  pinataGateway: 'https://amethyst-abundant-badger-162.mypinata.cloud'
})

export const uploadFile = async (file, onProgress) => {
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
    throw new Error(`Upload failed: ${error.message}`)
  }
}

export const getFileUrl = async (cid) => {
  try {
    const url = await pinata.gateways.createSignedURL({
      cid,
      expires: 3600 // 1 hour expiration
    })
    return url
  } catch (error) {
    throw new Error(`Failed to get file URL: ${error.message}`)
  }
}
