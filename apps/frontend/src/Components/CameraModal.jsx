import { useEffect } from 'react'
import { usePlantStore } from '../store/usePlantStore.js'
import { useCamera } from '../hooks/useCamera.js'
import { useNavigate } from "react-router-dom"

export default function CameraModal() {
  const { isCameraOpen, closeCamera, setCapturedPhoto } = usePlantStore() // Asumiendo que guardas la foto en el store
  const { startCamera, stopCamera, error, videoRef } = useCamera()
  const navigate = useNavigate()

  // 1. Activar /Desactivar la cámara según se abra o cierre el modal
  useEffect(() => {
    if (isCameraOpen) {
      startCamera()
    } else {
      stopCamera()
    }
    //Al desmontra componente o al cambiar el valor de las dependencias
    return () => stopCamera()
  }, [isCameraOpen])

  // 2. Tomar la foto
  const handleTakePhoto = () => {
    if (!videoRef.current) return

    const video = videoRef.current
    const canvas = document.createElement('canvas')

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const context = canvas.getContext('2d')
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Convertimos la imagen a un File listo para Pl@ntNet
    canvas.toBlob((blob) => {
      const file = new File([blob], `plant-${Date.now()}.jpg`, { type: 'image/jpeg' })

      // Guardado del archivo en la store
      if (setCapturedPhoto) setCapturedPhoto(file)

      stopCamera()
      closeCamera()

      //
      if (setCapturedPhoto) navigate("/newplant")
    }, 'image/jpeg', 0.9)
  }

  const handleClose = () => {
    closeCamera()
    setCapturedPhoto(null)
    navigate("/")
  }

  if (!isCameraOpen) return null

  return (
    <section className="fixed inset-0 bg-black/90 z-50 flex flex-col justify-between items-center p-4">

      <div className="w-full flex justify-end">
        <button
          className="text-white text-2xl font-bold p-2 hover:opacity-75"
          onClick={handleClose}
        >
          ✕
        </button>
      </div>

      {/* Visor del Video */}
      <div className="relative w-full max-w-sm aspect-[3/4] bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-white/20">
        {error ? (
          <p className="text-red-400 text-sm text-center px-4">{error}</p>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline // Fundamental para móviles
            className="w-full h-full object-cover"
          />
        )}

        {/*Guía visual para encuadrar*/}
        {!error && (
          <div className="absolute inset-8 border-2 border-white/30 border-dashed rounded-xl pointer-events-none" />
        )}
      </div>

      {/* Botón Disparador*/}
      <div className="mb-6">
        <button
          onClick={handleTakePhoto}
          disabled={!!error}
          className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center p-1 active:scale-95 transition-transform"
        >
          <div className="w-full h-full bg-emerald-500 rounded-full" />
        </button>
      </div>
    </section>
  )
}