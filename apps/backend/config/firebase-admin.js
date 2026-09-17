import { initializeApp, cert } from 'firebase-admin/app';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)

export const adminConfig = initializeApp({
    credential: cert(serviceAccount)
})

export default adminConfig