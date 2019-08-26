import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import '../sass/style.scss'

module.hot.accept()

render(<App />, document.getElementById('app'))
