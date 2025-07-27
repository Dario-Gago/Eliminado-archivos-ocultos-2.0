import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Providers
import { AuthProvider } from './contexts/AuthContext'
import { FileProvider } from './contexts/FileContext'
import { NotificationProvider } from './contexts/NotificationContext'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
// import NotificationContainer from './components/NotificationContainer' // Solo si existe

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <FileProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route
                    path="/login"
                    element={
                      <PublicRoute>
                        <Login />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
              <Footer />
              {/* Solo incluir si tienes el componente NotificationContainer */}
              {/* <NotificationContainer /> */}
            </div>
          </FileProvider>
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  )
}

export default App
