import { createCipheriv, randomBytes } from 'node:crypto'

import { env } from '@/infra/env'

export function encrypt(value: string, secretKey: string = env.PK_SECRET) {
  const encryptionKey = Buffer.from(secretKey, 'hex')
  const iv = randomBytes(16)
  const cipher = createCipheriv('aes-256-cbc', encryptionKey, iv)

  let encrypted = cipher.update(value, 'utf8', 'hex')

  encrypted += cipher.final('hex')
  const encryptedData = `${iv.toString('hex')}:${encrypted}`

  return encryptedData
}
