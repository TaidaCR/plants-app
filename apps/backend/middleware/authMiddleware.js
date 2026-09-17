import adminConfig from '../config/firebase-admin.js'
import {getAuth} from 'firebase-admin/auth'

export const authMiddleware = (req, res, next) => {
                                    //del store
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ message: 'No se proporcionó el token de autenticación' })
    }

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Formato de token inválido' })
    }
    const token = authHeader.split(' ')[1]

                        //Envía token a servidores de Firebase para verificarlo
    getAuth(adminConfig).verifyIdToken(token)
        .then(decodedToken => {
            req.userId = decodedToken.uid
            console.log('authMiddleware - req.userId:', req.userId)
            next()
        })
        .catch(error => {
            console.error('Error al verificar el token:', error)
            return res.status(401).json({ message: 'Token de autenticación inválido' })
        })
}