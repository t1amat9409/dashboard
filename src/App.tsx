import './App.css'
import { ThemeProvider, createTheme } from '@mui/material'
import { Routes } from './routes'
import { RouterProvider } from 'react-router-dom'

const theme = createTheme({
  palette: {
    primary: {
      main: '#274A9A'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={Routes} />
    </ThemeProvider>
  )
}

export default App
