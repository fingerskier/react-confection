import { useEffect } from 'react'
import { useUrl } from 'react-confection'

import ContactPicker from './ContactPicker.tsx'
import DeviceOrientation from './DeviceOrientation.tsx'
import Geo from './Geo.tsx'
import Interval from './Interval.tsx'
import LocalStore from './LocalStore.tsx'
import Notification from './Notification.tsx'
import PictureInPicture from './PictureInPicture.tsx'
import ScreenOrientation from './ScreenOrientation.tsx'
import Timeout from './Timeout.tsx'
import Wait from './Wait.tsx'
import Webcam from './Webcam.tsx'
import Websocket from './Websocket.tsx'
import UrlRouting from './UrlRouting.tsx'

const TESTOR = [
  'useContacts',
  'useDeviceOrientation',
  'useGeoLocation',
  'useInterval',
  'useLocalStore',
  'useNotification',
  'usePictureInPicture',
  // 'useScreenOrientation',
  'useTimeout',
  'useUrl',
  // 'useWait',
  // 'useWebcam',
  'useWebsocket',
]


export default function Main() {
  const { context, query, goto } = useUrl()

  useEffect(() => {
    console.log('context', context)
    console.log('query', query)
  }, [context, query])

  return <>
    <nav>
      {TESTOR.map(val => <li key={val}>
        <a href={`#${val}`}>{val}</a>
      </li> )}
    </nav>

    <div>Main</div>

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
      {context==='useUrl' && <UrlRouting />}
      {context==='useWait' && <Wait />}
      {context==='useWebcam' && <Webcam />}
      {context==='useWebsocket' && <Websocket />}
    </main>
  </>
}