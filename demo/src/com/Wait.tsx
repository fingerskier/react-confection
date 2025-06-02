import {useState} from 'react'
import { useWait } from 'react-confection'


export default function Wait() {
  const [condition, setCondition] = useState(false)
  const [state, setState] = useState(false)
  
  const wait = useWait(false, 5678)


  const waitForIt = ()=>{
    wait().then(()=>{
      setCondition(false)
      setState('done')
    })
    .catch(()=>{
      setState('timed out')
      setCondition(false)
    })
  }

  const setConditionTrue = ()=>{
    setCondition(true)
  }

  return <>
    <h2>Wait</h2>
    <button onClick={waitForIt}>Start Waiting</button>
    <button onClick={setConditionTrue}>Set Condition</button>
  </>
}