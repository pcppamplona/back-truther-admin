import { createDecipheriv } from 'crypto'

import { BadRequestError } from '@/errors/bad-request-error'
import { env } from '@/infra/env'

export function decryptAuthCode(authCode: string) {
  try {
    const encryptionKey = Buffer.from(env.PK_SECRET, 'hex')

    const [ivHex, encryptedData] = authCode.split(':')

    if (!ivHex || !encryptedData) {
      throw new BadRequestError('Invalid authCode')
    }

    const iv = Buffer.from(ivHex, 'hex')

    const decipher = createDecipheriv('aes-256-cbc', encryptionKey, iv)

    let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
  } catch (error) {
    throw new BadRequestError('Failed to decrypt authCode.')
  }
}
