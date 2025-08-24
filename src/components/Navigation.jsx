import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx'
import { BrainCircuit, Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/community', label: 'Community' },
  { to: '/ecosystem', label: 'Ecosystem' },
  { to: '/hub', label: 'Hub' },
  { to: '/dashboard', label: 'Dashboard' },
];

const NavLink = ({ to, children, isButton }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  if (isButton) {
    return (
        <Link to={to}>
            <Button className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700">{children}</Button>
        </Link>
    )
  }

  return (
    <Link
      to={to}
      className={`transition-colors text-base ${isActive ? 'text-primary' : 'text-text hover:text-primary'}`}>
      {children}
    </Link>
  );
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-gray-medium z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BrainCircuit className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-text">The Nerdy Network</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} isButton={link.label === 'Dashboard'}>{link.label}</NavLink>
            ))}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-text">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-background border-t border-gray-medium">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
                <div className="my-2">
                    <NavLink key={link.to} to={link.to} isButton={link.label === 'Dashboard'}>{link.label}</NavLink>
                </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;