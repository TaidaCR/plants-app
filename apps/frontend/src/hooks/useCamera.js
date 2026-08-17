import { useState, useRef } from 'react'

export function useCamera() {
  const streamRef = useRef(null)
  const stoppedRef = useRef(false)
  const [error, setError] = useState(null)
  const videoRef = useRef(null)

  const startCamera = async () => {
    if (streamRef.current) return

    stoppedRef.current = false

    setError(null)
    try {
      // Pedimos la cámara trasera ('environment')
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      })
      if (stoppedRef.current) {
        mediaStream.getTracks().forEach((track) => track.stop())
        return
      }

      streamRef.current = mediaStream

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      console.error('Error al acceder a la cámara:', err)
      setError('No se pudo acceder a la cámara. Revisa los permisos del navegador.')
    }
  }

  const stopCamera = () => {
    stoppedRef.current = true
    const stream = streamRef.current
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setError(null)
  }

  return {
    startCamera,
    stopCamera,
    error,
    videoRef
  }
}