import { useAuthStore } from "../store/useAuthStore"
import Button from '../Components/Button'
import { auth } from "../firebase/config.js"
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth"

export default function LoginPage() {
    const { user } = useAuthStore()

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider()

        provider.setCustomParameters({
            prompt: 'select_account'
        });

        try {
            // 1. Redirige a Google para autenticar
            await signInWithRedirect(auth, provider)
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