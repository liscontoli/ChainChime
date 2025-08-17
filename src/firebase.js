import { env } from './env'
import { initializeApp } from 'firebase/app'

console.log('env', env)
export const firebaseConfig = {
  apiKey: env.DETHREADER_FIREBASE_API_KEY,
  authDomain: env.DETHREADER_FIREBASE_AUTH_DOMAIN,
  databaseURL: env.DETHREADER_FIREBASE_DATABASE_URL,
  projectId: env.DETHREADER_FIREBASE_PROJECT_ID,
  storageBucket: env.DETHREADER_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.DETHREADER_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.DETHREADER_FIREBASE_APP_ID,
  measurementId: env.DETHREADER_FIREBASE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)

export default app
