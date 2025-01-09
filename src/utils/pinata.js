import axios from 'axios'

const pinataJWT = import.meta.env.VITE_PINATA_JWT
const pinataGateway = import.meta.env.VITE_PINATA_GATEWAY

export const pinFileToIPFS = async (file) => {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${pinataJWT}`
        }
      }
    )

    return {
      success: true,
      cid: response.data.IpfsHash,
      gatewayUrl: `${pinataGateway}/ipfs/${response.data.IpfsHash}`
    }
  } catch (error) {
    console.error('Pinata upload error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

export const unpinFromIPFS = async (cid) => {
  try {
    await axios.delete(
      `https://api.pinata.cloud/pinning/unpin/${cid}`,
      {
        headers: {
          Authorization: `Bearer ${pinataJWT}`
        }
      }
    )
    return true
  } catch (error) {
    console.error('Pinata unpin error:', error)
    return false
  }
}
