import axios from 'axios'

export const XamanAuth = {
  isAuthenticated: () => {
    return !!localStorage.getItem('xummToken')
  },

  connect: async () => {
    try {
      const response = await axios.post('/api/xaman/connect')
      localStorage.setItem('xummToken', response.data.token)
      localStorage.setItem('xummAccount', response.data.account)
      return true
    } catch (error) {
      console.error('Xaman connection error:', error)
      return false
    }
  },

  logout: () => {
    localStorage.removeItem('xummToken')
    localStorage.removeItem('xummAccount')
  },

  getCurrentUser: () => {
    return {
      account: localStorage.getItem('xummAccount'),
      token: localStorage.getItem('xummToken')
    }
  }
}
