import { useState } from 'react'
import IntroAnimation from './IntroAnimation'
import MainPage from './MainPage'

function App() {
  const [showMainPage, setShowMainPage] = useState(false)

  const handleConnect = () => {
    setShowMainPage(true)
  }

  return (
    <>
      {!showMainPage ? (
        <IntroAnimation onConnect={handleConnect} />
      ) : (
        <MainPage />
      )}
    </>
  )
}

export default App
