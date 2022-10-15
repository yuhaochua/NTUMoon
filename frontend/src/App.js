import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Review from './pages/Review'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Account from './pages/Account'
import Navbar from './components/Navbar'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
              // element={<Home />} 
            />
            <Route 
              path="/review" 
              element={user ? <Review /> : <Navigate to="/login" />} 
              //NOT enabling the user authentication check first because i(yuhao) cannot log in
              // element={<Review />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
            <Route 
              path="/account" 
              element={user ? <Account /> : <Navigate to="/account" />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;