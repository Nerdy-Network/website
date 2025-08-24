import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation.jsx'
import LandingPage from './components/LandingPage.jsx'
import JobBoard from './components/JobBoard.jsx'
import Community from './components/Community.jsx'
import Ecosystem from './components/Ecosystem.jsx'
import Hub from './components/Hub.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/jobs" element={<JobBoard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/ecosystem" element={<Ecosystem />} />
          <Route path="/hub" element={<Hub />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App

