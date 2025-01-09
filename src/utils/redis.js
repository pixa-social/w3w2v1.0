import { createClient } from '@upstash/redis'

const redis = createClient({
  url: import.meta.env.VITE_KV_REST_API_URL,
  token: import.meta.env.VITE_KV_REST_API_TOKEN,
})

export const setRedis = async (key, value) => {
  try {
    await redis.set(key, value)
    return true
  } catch (error) {
    console.error('Redis set error:', error)
    return false
  }
}

export const getRedis = async (key) => {
  try {
    return await redis.get(key)
  } catch (error) {
    console.error('Redis get error:', error)
    return null
  }
}

export const deleteRedis = async (key) => {
  try {
    await redis.del(key)
    return true
  } catch (error) {
    console.error('Redis delete error:', error)
    return false
  }
}
