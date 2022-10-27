import * as ReactDOM from 'react-dom/client'
import App from './App'
import React from 'react'
import '@/sites/assets/styles/reset.scss'
import '@/sites/assets/styles/md-style.scss'

const rootElement = document.querySelector('#doc')

if (rootElement != null) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<App />)
}
