import React from 'react'
import { useLocalStore } from 'react-confection'


export default function LocalStore() {
  return <div>
    <h1>LocalStore</h1>

    <First />

    <Second />
  </div>
}


function First() {
  const Store = useLocalStore('flarn')

  return <div>
    <label>
      First
      <input type="text" value={Store.thing} onChange={(e) => Store.thing = e.target.value} />
    </label>
  </div>
}


function Second() {
  const Store = useLocalStore('flarn')

  return <div>
    <label>
      Second
      <input type="text" value={Store.thing} onChange={(e) => Store.thing = e.target.value} />
    </label>
  </div>
}