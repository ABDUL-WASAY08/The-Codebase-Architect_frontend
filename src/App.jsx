import { useEffect } from 'react'
import './App.css'
import AuthComp from './Compoents/AuthComp'
import { Toaster } from "react-hot-toast"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import useUserStore from './Store/userStore'
import MainScreen from './Compoents/MainScreen'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import NotFound from './Compoents/NotFound'
import Analyzer from './Compoents/Analyzer'

function App() {
  const { getMe, isLoading,isAuthenticated } = useUserStore();
  useEffect(() => {
    getMe();
  }, [isAuthenticated])
  if (isLoading) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <h1 className='text-blue-900'>VERIFYING</h1>
      </div>
    )
  }
  return (
    <div>
      <div  >
        <Toaster position='top-center' reverseOrder={false} />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={isAuthenticated?<Navigate to='/DashBoard' />:<AuthComp />} />
          <Route path='/DashBoard' element={<ProtectedRoute><MainScreen /></ProtectedRoute>} />
          <Route path='/Analyzer' element={<ProtectedRoute><Analyzer /></ProtectedRoute>} />
          <Route path='*' element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
