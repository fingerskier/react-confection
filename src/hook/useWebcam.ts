import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

interface WebcamResult {
  picBase64: string
  update: (event?: Event) => void
}

export default function useWebcam(videoRef: RefObject<HTMLVideoElement | null>): WebcamResult {
  const [picBase64, setPicBase64] = useState('')

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
            requestAnimationFrame(() => {
              update()
            })
          }
        })
        .catch(function (err0r) {
          console.error('Something went wrong!', err0r)
        })
    }
    // return () => {
    //   if (videoRef?.current) videoRef.current.srcObject = null
    // }
  }, [])

  const update = () => {
    if (!videoRef.current) return
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
    setPicBase64(canvas.toDataURL().slice('data:image/png;base64,'.length))
  }

  return { picBase64, update }
}