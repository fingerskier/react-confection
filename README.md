# react-confection

> A collection of useful react stuff.

[![NPM](https://img.shields.io/npm/v/react-confection.svg)](https://www.npmjs.com/package/react-confection) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-confection
```

## Usage

```jsx
import React, { Component } from 'react'

import {useInterval} from 'react-confection'


export default function() {
  const [count, setCount] = useState(0)


  useInterval(()=>{
    setCount(count+1)
  }, 1234)


  return <>
    <h2> useInterval </h2>
    
    <p>
      Just a perpetual timer that snuggles with React.  This one updates a counter every 1,234ms.
      <br />
      Count: {count}
    </p>
  </>
}
```

## License

MIT © [fingerskier](https://github.com/fingerskier)
