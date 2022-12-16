import React, {useState} from 'react'

window.Global = {}


export default function(name, _default) {  
  if (!window.Global[name]) {
    const state = useState(_default)

    window.Global[name] = state
  }

  return window.Global[name]
}