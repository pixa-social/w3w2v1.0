```js
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: import.meta.env.VITE_KV_REST_API_URL,
  token: import.meta.env.VITE_KV_REST_API_TOKEN,
})

export async function setRedis(key, value) {
  try {
    await redis.set(key, value)
  } catch (error) {
    console.error('Error setting Redis key:', error)
    throw error
  }
}

export async function getRedis(key) {
  try {
    return await redis.get(key)
  } catch (error) {
    console.error('Error getting Redis key:', error)
    throw error
  }
}

export async function deleteRedis(key) {
  try {
    await redis.del(key)
  } catch (error) {
    console.error('Error deleting Redis key:', error)
    throw error
  }
}

export async function listRedisKeys(pattern = '*') {
  try {
    return await redis.keys(pattern)
  } catch (error) {
    console.error('Error listing Redis keys:', error)
    throw error
  }
}

export async function flushRedis() {
  try {
    await redis.flushdb()
  } catch (error) {
    console.error('Error flushing Redis:', error)
    throw error
  }
}
```
