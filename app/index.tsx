import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import './app.css'
import Views from './views'
import theme from './theme'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Views />
  </ThemeProvider>,
  document.getElementById('app')
)
