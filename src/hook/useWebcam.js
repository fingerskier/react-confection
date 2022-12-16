import React, {useEffect, useState} from 'react'


export default function useWebcam(videoRef) {
  const [picBase64, setPicBase64] = useState('')


  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
          videoRef.current.srcObject = stream

          requestAnimationFrame(()=>{
            update()
          })
        })
        .catch(function (err0r) {
          console.error("Something went wrong!", err0r);
        });
    }
  
    // return () => {
    //   videoRef?.current?.srcObject = null;
    // }
  }, [])


  const update = event=>{
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    setPicBase64(canvas.toDataURL().slice('data:image/png;base64,')[1])
  }


  return {picBase64, update}
}