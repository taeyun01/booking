import HotelPage from '@/pages/Hotel'
import HotelList from '@pages/HotelList'
import Test from '@pages/Test'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import useLoadKakao from '@/hooks/useLoadKakao'
import SigninPage from '@/pages/Signin'
import MyPage from '@/pages/My'
import AuthGuard from '@/components/auth/AuthGuard'
import Navbar from '@/components/shared/Navbar'

function App() {
  useLoadKakao()
  return (
    <>
      <BrowserRouter>
        <AuthGuard>
          <Navbar />
          <Routes>
            <Route path="/" element={<HotelList />} />
            <Route path="/hotel/:id" element={<HotelPage />} />
            <Route path="/my" element={<MyPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </AuthGuard>
      </BrowserRouter>
    </>
  )
}

export default App
