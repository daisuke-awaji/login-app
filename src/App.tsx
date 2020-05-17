import React from 'react'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { Routes } from 'Routes'
import { palette } from 'theme'

function App() {
  const theme = createMuiTheme({ palette: palette })
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  )
}

export default App
