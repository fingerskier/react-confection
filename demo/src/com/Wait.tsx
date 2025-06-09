import {useEffect, useState} from 'react'
import { useWait } from 'react-confection'


export default function Wait() {
  const [condition, setCondition] = useState(false)
  const [state, setState] = useState(false)
  
  const done = useWait(condition, 5678)


  const setConditionTrue = ()=>{
    setCondition(true)
  }


  useEffect(()=>{
    if (done) {
      setState('done')
    } else {
      setState('waiting')
    }
  }, [done])


  return <>
    <h2>Wait</h2>
    <button onClick={setConditionTrue}>Set Condition</button>
    <p>state: {state}</p>
  </>
}
