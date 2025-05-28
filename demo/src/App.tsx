import useSimpleRouter from '@hook/useSimpleRouter'
import './App.css'

import LocalStore from '@com/LocalStore'
import LocalStorageDemo from '@com/LocalStorage'
import IntervalDemo from '@com/Interval'
import TimeoutDemo from '@com/Timeout'
import WaitDemo from '@com/Wait'
import ContactsDemo from '@com/Contacts'
import DeviceOrientationDemo from '@com/DeviceOrientation'
import GeoLocationDemo from '@com/GeoLocation'
import GlobalDemo from '@com/Global'
import FSMDemo from '@com/FSM'
import NotificationDemo from '@com/Notification'
import PiPHookDemo from '@com/PictureInPictureHook'
import PiPComponentDemo from '@com/PictureInPictureComponent'
import RESTAPIDemo from '@com/RESTAPI'
import ScreenOrientationDemo from '@com/ScreenOrientation'
import SimpleRouterDemo from '@com/SimpleRouterDemo'
import WebSocketDemo from '@com/WebSocket'
import WebcamHookDemo from '@com/WebcamHook'
import WebcamComponentDemo from '@com/WebcamComponent'

function App() {
  const router = useSimpleRouter()

  return (
    <div>
      <nav>
        <ul>
          <li><a href="#/localStore">LocalStore</a></li>
          <li><a href="#/localStorage">LocalStorage</a></li>
          <li><a href="#/interval">Interval</a></li>
          <li><a href="#/timeout">Timeout</a></li>
          <li><a href="#/wait">Wait</a></li>
          <li><a href="#/contacts">Contacts</a></li>
          <li><a href="#/deviceOrientation">DeviceOrientation</a></li>
          <li><a href="#/geoLocation">GeoLocation</a></li>
          <li><a href="#/global">Global</a></li>
          <li><a href="#/fsm">FSM</a></li>
          <li><a href="#/notification">Notification</a></li>
          <li><a href="#/pipHook">PiP Hook</a></li>
          <li><a href="#/pipComponent">PiP Component</a></li>
          <li><a href="#/restapi">RESTAPI</a></li>
          <li><a href="#/screenOrientation">ScreenOrientation</a></li>
          <li><a href="#/simpleRouter">SimpleRouter</a></li>
          <li><a href="#/websocket">WebSocket</a></li>
          <li><a href="#/webcamHook">Webcam Hook</a></li>
          <li><a href="#/webcamComponent">Webcam Component</a></li>
        </ul>
      </nav>

      <router.Route path="localStore" element={<LocalStore />} />
      <router.Route path="localStorage" element={<LocalStorageDemo />} />
      <router.Route path="interval" element={<IntervalDemo />} />
      <router.Route path="timeout" element={<TimeoutDemo />} />
      <router.Route path="wait" element={<WaitDemo />} />
      <router.Route path="contacts" element={<ContactsDemo />} />
      <router.Route path="deviceOrientation" element={<DeviceOrientationDemo />} />
      <router.Route path="geoLocation" element={<GeoLocationDemo />} />
      <router.Route path="global" element={<GlobalDemo />} />
      <router.Route path="fsm" element={<FSMDemo />} />
      <router.Route path="notification" element={<NotificationDemo />} />
      <router.Route path="pipHook" element={<PiPHookDemo />} />
      <router.Route path="pipComponent" element={<PiPComponentDemo />} />
      <router.Route path="restapi" element={<RESTAPIDemo />} />
      <router.Route path="screenOrientation" element={<ScreenOrientationDemo />} />
      <router.Route path="simpleRouter" element={<SimpleRouterDemo />} />
      <router.Route path="websocket" element={<WebSocketDemo />} />
      <router.Route path="webcamHook" element={<WebcamHookDemo />} />
      <router.Route path="webcamComponent" element={<WebcamComponentDemo />} />
    </div>
  )
}

export default App
