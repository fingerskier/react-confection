import { useState } from 'react'
import {useLocalStorage, useUrl, useWebcam, useWebsocket} from 'react-confection'
import ContactPicker from '@/com/ContactPicker'
import DeviceOrientation from '@/com/DeviceOrientation'
import Geo from '@/com/Geo'
import Interval from '@/com/Interval'
import LocalStore from '@/com/LocalStore'
import Notification from '@/com/Notification'
import PictureInPicture from '@/com/PictureInPicture'
import ScreenOrientation from '@/com/ScreenOrientation'
import Timeout from '@/com/Timeout'
import Wait from '@/com/Wait'
import Webcam from '@/com/Webcam'
import Websocket from '@/com/Websocket'

import './App.css'

const TESTOR = [
  'useContacts',
  'useDeviceOrientation',
  'useGeoLocation',
  'useInterval',
  'useLocalStore',
  'useNotification',
  'usePictureInPicture',
  'useScreenOrientation',
  'useTimeout',
  'useWait',
  'useWebcam',
  'useWebsocket',
]


function App() {
  const { context, query } = useUrl()

  return <>
    <header> 
      <h1> react-confection demo app </h1> 

      <ul>
        {TESTOR.map(val => (
          <li key={val}>
            <a href={`#${val}`}>{val}</a>
          </li>
        ))}
      </ul>
    </header>

    <ul>
      {query.flarn}
      <li><a href="?flarn=1#">flarn 1</a></li>
      <li><a href="?flarn=2#">flarn 2</a></li>
      <li><a href="?flarn=3#">flarn 3</a></li>
    </ul>

    <main>
      {context==='useContacts' && <ContactPicker />}
      {context==='useDeviceOrientation' && <DeviceOrientation />}
      {context==='useGeoLocation' && <Geo />}
      {context==='useInterval' && <Interval />}
      {context==='useLocalStore' && <LocalStore />}
      {context==='useNotification' && <Notification />}
      {context==='usePictureInPicture' && <PictureInPicture />}
      {context==='useScreenOrientation' && <ScreenOrientation />}
      {context==='useTimeout' && <Timeout />}
      {context==='useWait' && <Wait />}
      {context==='useWebcam' && <Webcam />}
      {context==='useWebsocket' && <Websocket />}
    </main>

    <footer>&copy; 2025 react-confection</footer>
  </>
}

export default App
