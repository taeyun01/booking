import { lazy, Suspense } from 'react'

const PrivateRoute = lazy(() => import('@/components/auth/PrivateRoute'))
const Test = lazy(() => import('@/pages/Test'))
const HotelList = lazy(() => import('@/pages/HotelList'))
const HotelPage = lazy(() => import('@/pages/Hotel'))
const MyPage = lazy(() => import('@/pages/My'))
const SigninPage = lazy(() => import('@/pages/Signin'))
const SettingsPage = lazy(() => import('@/pages/settings'))
const LikePage = lazy(() => import('@/pages/settings/like'))
const SchedulePage = lazy(() => import('@/pages/Schedule'))
const ReservationPage = lazy(() => import('@/pages/Reservation'))
const ReservationDonePage = lazy(() => import('@/pages/ReservationDone'))
const ReservationListPage = lazy(() => import('@/pages/ReservationList'))

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import useLoadKakao from '@/hooks/useLoadKakao'
import AuthGuard from '@/components/auth/AuthGuard'
import Navbar from '@/components/shared/Navbar'

import { HelmetProvider } from 'react-helmet-async'

function App() {
  useLoadKakao()
  return (
    <Suspense fallback={<></>}>
      <HelmetProvider>
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
              <Route
                path="/schedule"
                element={
                  <PrivateRoute>
                    <SchedulePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/reservation"
                element={
                  <PrivateRoute>
                    <ReservationPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/reservation/done"
                element={
                  <PrivateRoute>
                    <ReservationDonePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/reservation/list"
                element={
                  <PrivateRoute>
                    <ReservationListPage />
                  </PrivateRoute>
                }
              />
              <Route path="/test" element={<Test />} />
            </Routes>
          </AuthGuard>
        </BrowserRouter>
      </HelmetProvider>
    </Suspense>
  )
}

export default App
