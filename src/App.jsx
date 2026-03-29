
import './App.css'
import AuthComp from './Compoents/AuthComp'
import MainScreen from './Compoents/MainScreen'
import { Toaster } from "react-hot-toast"
import{ BrowserRouter, Routes,Route} from "react-router-dom"

function App() {
  return (
    <>
      <div >
        <Toaster position='top-center' reverseOrder={false}/>
      </div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthComp />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
