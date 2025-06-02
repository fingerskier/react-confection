import React from 'react'
import useSimpleRouter from '@hook/useSimpleRouter'

export default function SimpleRouterDemo() {
  const router = useSimpleRouter()

  return (
    <div>
      <h1>useSimpleRouter</h1>
      <div>
        <a href="#/first">First</a> | <a href="#/second">Second</a>
      </div>
      <router.Route path="first" element={<p>First page</p>} />
      <router.Route path="second" element={<p>Second page</p>} />
    </div>
  )
}
