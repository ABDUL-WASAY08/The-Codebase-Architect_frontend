import { useEffect } from 'react'
import './App.css'
import AuthComp from './Compoents/AuthComp'
import { Toaster } from "react-hot-toast"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import useUserStore from './Store/userStore'
import MainScreen from './Compoents/MainScreen'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import NotFound from './Compoents/NotFound'

function App() {
  const { getMe, isLoading } = useUserStore();
  useEffect(() => {
    getMe();
  }, [])
  if (isLoading) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <h1 className='text-blue-900'>VERIFYING</h1>
      </div>
    )
  }
  return (
    <>
      <div >
        <Toaster position='top-center' reverseOrder={false} />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthComp />} />
          <Route path='/DashBoard' element={<ProtectedRoute><MainScreen /></ProtectedRoute>} />
          <Route path='*' element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
