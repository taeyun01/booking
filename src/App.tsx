import HotelPage from '@/pages/Hotel'
import HotelList from '@pages/HotelList'
import Test from '@pages/Test'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import useLoadKakao from '@/hooks/useLoadKakao'
import SigninPage from '@/pages/Signin'
import MyPage from '@/pages/My'
import AuthGuard from '@/components/auth/AuthGuard'
import Navbar from '@/components/shared/Navbar'
import SettingsPage from '@/pages/settings'
import LikePage from '@/pages/settings/like'
import PrivateRoute from '@/components/auth/PrivateRoute'

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
            <Route
              path="/my"
              element={
                <PrivateRoute>
                  <MyPage />
                </PrivateRoute>
              }
            />
            <Route path="/signin" element={<SigninPage />} />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <SettingsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings/like"
              element={
                <PrivateRoute>
                  <LikePage />
                </PrivateRoute>
              }
            />
            <Route path="/test" element={<Test />} />
          </Routes>
        </AuthGuard>
      </BrowserRouter>
    </>
  )
}

export default App
