import {useState} from 'react'
import { useInterval } from 'react-confection'


export default function Interval() {
  const [count, setCount] = useState(0)

  const cancelInterval = useInterval(() => {
    setCount(count + 1)
  }, 1000)

  return <>
    <h2>Interval</h2>
    <button onClick={cancelInterval}>Stop</button>
    <p>{count}</p>
  </>
}