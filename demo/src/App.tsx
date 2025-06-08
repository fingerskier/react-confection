import { UrlProvider } from 'react-confection'

import Main from './com/Main.tsx'
import './App.css'


function App() {
  return <>
    <header> 
      <h1> react-confection demo app </h1> 
    </header>

    <UrlProvider>
      <Main />
    </UrlProvider>

    <footer>&copy; 2025 react-confection</footer>
  </>
}

export default App
