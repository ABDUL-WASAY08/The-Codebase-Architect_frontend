import { useEffect } from 'react'
import './App.css'
import AuthComp from './Compoents/AuthComp'
import { Toaster } from "react-hot-toast"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import useUserStore from './Store/userStore'

function App() {
  const {getMe}=useUserStore();
  useEffect(() => {
    getMe();
  },[])
  return (
    <>
      <div >
        <Toaster position='top-center' reverseOrder={false} />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthComp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
