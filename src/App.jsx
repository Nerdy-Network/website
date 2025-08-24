import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation.jsx'
import LandingPage from './components/LandingPage.jsx'
import JobBoard from './components/JobBoard.jsx'
import Community from './components/Community.jsx'
import Ecosystem from './components/Ecosystem.jsx'
import Hub from './components/Hub.jsx'
import Dashboard from './components/Dashboard.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

const AppContent = () => {
  const location = useLocation();
  const showHeaderFooter = location.pathname !== '/dashboard';

  return (
    <div className="min-h-screen">
      {showHeaderFooter && <Navigation />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/jobs" element={<JobBoard />} />
        <Route path="/community" element={<Community />} />
        <Route path="/ecosystem" element={<Ecosystem />} />
        <Route path="/hub" element={<Hub />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {showHeaderFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
