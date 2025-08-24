import { Button } from '@/components/ui/button.jsx'
import { Network } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Navigation = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Network className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">The Nerdy Network</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors ${isActive('/') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Home
            </Link>
            <Link 
              to="/jobs" 
              className={`transition-colors ${isActive('/jobs') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Jobs
            </Link>
            <Link 
              to="/community" 
              className={`transition-colors ${isActive('/community') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Community
            </Link>
            <Link 
              to="/ecosystem" 
              className={`transition-colors ${isActive('/ecosystem') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Ecosystem
            </Link>
            <Link 
              to="/hub" 
              className={`transition-colors ${isActive('/hub') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Hub
            </Link>
            <Link to="/community">
              <Button className="bg-blue-600 hover:bg-blue-700">Join Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

