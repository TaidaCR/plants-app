import { useAuthStore } from "../store/useAuthStore"
import { useNavigate } from "react-router-dom"
import Button from '../Components/Button'
import { auth } from "../firebase/config.js"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"

export default function LoginPage() {
    const { user, setUser } = useAuthStore()
    const navigate = useNavigate()

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider()

        provider.setCustomParameters({
            prompt: 'select_account'
        });

        try {
            // 1. Abre el pop-up nativo de Google
            const result = await signInWithPopup(auth, provider)
            const usuario = result.user
            setUser(usuario) // Guarda la info del usuario en el store

            console.log("user", user)
            console.log("Resultado:", result)
            navigate('/home')
        } catch (error) {
            console.error("Error al autenticar con Google:", error)
        }
    }

    return (
        <section>
            {user ?
                <p>Bienvenido {user.name}</p>
                :
                <div className="flex flex-col p-3 items-center">
                    <h1>Bienvenido a Adansonii</h1>
                    <Button type="submit" onClick={handleGoogleLogin} className="mt-3">Iniciar sesión con google</Button>

                </div>
            }
        </section>
    )
}