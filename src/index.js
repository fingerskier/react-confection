import React from 'react'
import styles from './styles.module.css'

import useLocalStorage from "./hook/useLocalStorage";
import useInterval from "./hook/useInterval";
import useWebcam from "./hook/useWebcam";
import useWebsocket from "./hook/useWebsocket";

import Webcam from './ux/Webcam'


export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}


export {
  useLocalStorage,
  useInterval,
  useWebcam,
  useWebsocket,
  Webcam,
}