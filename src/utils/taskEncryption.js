import CryptoJS from 'crypto-js'
import { env } from '../env'

const secretKey = env.CRYPTOJS_SECRET_KEY

export function encryptTasks(fields) {
  const encryptedTasks = fields.map(field => ({
    ...field,
    label: CryptoJS.AES.encrypt(field.label, secretKey).toString()
  }))
  return encryptedTasks
}

export function decryptTasks(fields) {
  const decryptedTasks = fields.map(field => ({
    ...field,
    label: CryptoJS.AES.decrypt(field.label, secretKey).toString(
      CryptoJS.enc.Utf8
    )
  }))
  return decryptedTasks
}
