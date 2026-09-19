import { useNavigate } from "react-router-dom"
import { onSignOut, auth } from "../firebase/config.js"

export default function UserDetailsPage() {
    const navigate = useNavigate()

    //Revisar. Pasarlo a store???
    const currentUser = auth.currentUser
    const name = currentUser?.displayName
    const email = currentUser?.email
    const photo = currentUser?.photoURL

    const handleSignOut = async () => {
        try {
            await onSignOut()
            navigate("/")
        } catch (error) {
            console.error("Error al cerrar sesión:", error)
        }
    }

    return (
        <section className="flex flex-col items-center p-[20px] pb-[100px] gap-6">
            <h1>Mi perfil</h1>

            <div className="flex flex-col items-center gap-4 w-full max-w-[320px]">
                {photo ? (
                    <img
                        src={photo}
                        alt={name}
                        className="w-[96px] h-[96px] rounded-full object-cover shadow-md"
                    />
                ) : (
                    <div className="w-[96px] h-[96px] rounded-full bg-secondary flex items-center justify-center text-3xl text-dark font-medium shadow-md">
                        {name ? name[0] : "?"}
                    </div>
                )}

                <div className="w-full bg-secondary rounded-xl p-5 flex flex-col gap-3">
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-xs text-dark/60 font-medium">Nombre</span>
                        <p className="text-dark font-medium">{name}</p>
                    </div>

                    <div className="h-px bg-dark/10" />

                    <div className="flex flex-col items-start gap-1">
                        <span className="text-xs text-dark/60 font-medium">Email</span>
                        <p className="text-dark font-medium break-all">{email}</p>
                    </div>
                </div>

                <button
                    onClick={handleSignOut}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-xl shadow transition-colors duration-200 cursor-pointer mt-2"
                >
                    Cerrar sesión
                </button>
            </div>
        </section>
    )
}