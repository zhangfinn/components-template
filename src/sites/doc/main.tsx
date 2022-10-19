import * as ReactDOM from 'react-dom/client'
import App from './App'
import React from 'react'

const rootElement = document.querySelector('#doc')

if (rootElement != null) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<App />)
}
