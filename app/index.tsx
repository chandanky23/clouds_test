import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import './app.css'
import Views from './views'
import Theme from './theme'

ReactDOM.render(
  <Theme>
    <Views />
  </Theme>,
  document.getElementById('app')
)
