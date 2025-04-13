import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import GuardDashboard from './pages/GuardDashboard';
import StudentDashboard from './pages/StudentDashboard';
import AddItem from './pages/AddItem';
import ItemDetails from './pages/ItemDetails';
import LostItems from './pages/LostItems';
import About from './pages/About';
import Contact from './pages/Contact';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// PrivateRoute component to protect routes that require authentication
const PrivateRoute = ({ children, requireGuard }) => {
  const { isAuthenticated, isGuard, loading } = useContext(AuthContext);
  
  console.log('PrivateRoute - isAuthenticated:', isAuthenticated);
  console.log('PrivateRoute - isGuard:', isGuard);
  console.log('PrivateRoute - requireGuard:', requireGuard);
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requireGuard && !isGuard) {
    console.log('Redirecting to student dashboard');
    return <Navigate to="/dashboard" />;
  }
  
  if (!requireGuard && isGuard) {
    console.log('Redirecting to guard dashboard');
    return <Navigate to="/guard-dashboard" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="container mx-auto px-4 py-8 flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/guard-dashboard" element={
                <PrivateRoute requireGuard>
                  <GuardDashboard />
                </PrivateRoute>
              } />
              <Route path="/dashboard" element={
                <PrivateRoute requireGuard={false}>
                  <StudentDashboard />
                </PrivateRoute>
              } />
              <Route path="/AddItem" element={
                <PrivateRoute requireGuard>
                  <AddItem />
                </PrivateRoute>
              } />
              <Route path="/items/:id" element={<ItemDetails />} />
              <Route path="/lost-items" element={<LostItems />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;