import { useAuthStore } from "../store/useAuthStore"
import { useNavigate } from "react-router-dom"
import Button from '../Components/Button'
import { auth } from "../firebase/config"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
// import { useId } from "react"

export default function LoginPage() {
    const { logIn } = useAuthStore()
    const navigate = useNavigate()

    // const emailId = useId()
    // const passwordId = useId()

    // const handleSubmit = (e) => {
    //     e.preventDefault()

    //     const formData = new FormData(e.currentTarget)
    //     const email = formData.get('email')
    //     const password = formData.get('password')
    //     if (email && password) {
    //         logIn()
    //         navigate('/')
    //     }
    // }

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider()
        
        try {
            // 1. Abre el pop-up nativo de Google
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            // 2. Guarda la info del usuario en el store
            logIn({
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            })

            navigate('/home')
        } catch (error) {
            console.error("Error al autenticar con Google:", error)
        }
    }

    return (
        <section>
            <div className="flex flex-col p-3 items-center">
                <h1>Bienvenido a Adansonii</h1>
                {/* <p className="max-w-[300px]">Introduce tus credenciales apra acceder a tu jardín</p> */}
                {/* <form className="flex flex-col items-center mt-4" onSubmit={handleSubmit}>
                    <label htmlFor={emailId} >Email</label>
                    <input type="email" id={emailId} name="email" required></input>
                    <label htmlFor={passwordId}>Password</label>
                    <input type="password" id={passwordId} name="password" required></input>
                </form> */}
                    <Button type="submit" onClick={handleGoogleLogin} className="mt-3">Iniciar sesión con google</Button>

            </div>
        </section>
    )
}