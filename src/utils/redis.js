import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: import.meta.env.VITE_KV_REST_API_URL,
  token: import.meta.env.VITE_KV_REST_API_TOKEN,
})

export async function setRedis(key, value) {
  await redis.set(key, value)
}

export async function getRedis(key) {
  return await redis.get(key)
}

export async function deleteRedis(key) {
  await redis.del(key)
}

export async function incrementRedis(key) {
  return await redis.incr(key)
}

export async function decrementRedis(key) {
  return await redis.decr(key)
}

export async function listRedisKeys(pattern = '*') {
  return await redis.keys(pattern)
}

export async function flushRedis() {
  await redis.flushdb()
}
