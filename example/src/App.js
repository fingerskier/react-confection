import React, {useState} from 'react'

import {useLocalStorage} from "react-confection";
import {useInterval} from "react-confection";
import {Webcam} from 'react-confection'

import 'react-confection/dist/index.css'


const App = () => {
  const [state, setState] = useLocalStorage('test', 'value')

  const [count, setCount] = useState(0)
  const [camFlip, setCamFlip] = useState(false)


  const cancelCounter = useInterval(()=>{
    setCount(count+1)
  }, 1234)


  return <>
    <h1>😄 react-confection 😄</h1>

    <h4>made using <a href="https://www.npmjs.com/package/create-react-library">create-react-library</a></h4>

    <p>
      <em>react-confection</em> is a cornucopia of hooks and components that I need/like/want in my projects.
    </p>


    


    <h2> useLocalStorage </h2>
    <label>
      Change the value and refresh the page
      <input 
        onChange={E=>setState(E.target.value)}
        value={state}
        type="text" 
      />
    </label>


    <h2> useInterval </h2>
    <p>
      A perpetual timer that snuggles with React.  This one updates a counter every 1,234ms.
      <br />
      Count: {count}
      <br />
      <button onClick={E=>cancelCounter()}>Cancel Timer</button>
    </p>


    <h2> WebCam / useWebcam</h2>
    <label>
      Flip horizontal?
      <input
        onChange={E=>setCamFlip(!camFlip)}
        type="checkbox"
        value={camFlip}
      />
    </label>
    <Webcam 
      flipHorizontal={camFlip}
    />
  </> 
}


export default App