import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { images } from '../assets/images';
import { User, LogOut, Calendar, Menu, X, Shield, Lock } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    const userData = localStorage.getItem('user');
    if (userData) setIsLoggedIn(true);

    const adminData = localStorage.getItem('adminUser');
    if (adminData) {
      try {
        const admin = JSON.parse(adminData);
        if (admin.isAdmin) setIsAdmin(true);
      } catch (error) {
        console.error("Error parsing admin data:", error);
      }
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogin = () => {
    localStorage.setItem('user', JSON.stringify({ name: 'Հյուր Օգտատեր', email: 'user@example.com' }));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    if (isAdmin) {
      localStorage.removeItem('adminUser');
      setIsAdmin(false);
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminUser');
    setIsAdmin(false);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent before:absolute before:inset-0 before:bg-blue-900/70 before:z-[-1]'
      }`}
    >
      <div className="page-container">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <img 
              src={images.logo} 
              alt="Մեդ Կենտրոն" 
              className="h-14 transition-transform hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" isScrolled={isScrolled} currentPath={location.pathname}>Գլխավոր</NavLink>
            <NavLink to="/services" isScrolled={isScrolled} currentPath={location.pathname}>Ծառայություններ</NavLink>
            <NavLink to="/doctors" isScrolled={isScrolled} currentPath={location.pathname}>Բժիշկներ</NavLink>
            <NavLink to="/about" isScrolled={isScrolled} currentPath={location.pathname}>Մեր մասին</NavLink>

            {isLoggedIn ? (
              <UserMenu isScrolled={isScrolled} onLogout={handleLogout} isAdmin={isAdmin} onAdminLogout={handleAdminLogout} />
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/appointment" 
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-button hover:bg-blue-600 button-hover"
                >
                  Ամրագրել այցելություն
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`px-3 py-1.5 rounded ${
                        isScrolled 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      } transition-colors`}
                    >
                      Գրանցվել
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={handleLogin} className="cursor-pointer">
                      Մուտք գործել
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/register" className="cursor-pointer w-full">
                        Գրանցվել
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/admin-login" className="cursor-pointer w-full flex items-center">
                        <Lock className="mr-2 h-4 w-4" />
                        <span>Ադմինիստրատոր</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> 
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-blue-600 focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md rounded-lg mt-2 p-4 absolute left-4 right-4 transition-all duration-300 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <MobileNavLink to="/" onClick={toggleMobileMenu} currentPath={location.pathname}>Գլխավոր</MobileNavLink>
              <MobileNavLink to="/services" onClick={toggleMobileMenu} currentPath={location.pathname}>Ծառայություններ</MobileNavLink>
              <MobileNavLink to="/doctors" onClick={toggleMobileMenu} currentPath={location.pathname}>Բժիշկներ</MobileNavLink>
              <MobileNavLink to="/about" onClick={toggleMobileMenu} currentPath={location.pathname}>Մեր մասին</MobileNavLink>

              {isLoggedIn ? (
                <>
                  <MobileNavLink to="/profile" onClick={toggleMobileMenu} currentPath={location.pathname}>
                    <User size={18} className="mr-2" /> Իմ պրոֆիլը
                  </MobileNavLink>
                  <MobileNavLink to="/my-appointments" onClick={toggleMobileMenu} currentPath={location.pathname}>
                    <Calendar size={18} className="mr-2" /> Իմ այցելությունները
                  </MobileNavLink>
                  {isAdmin && (
                    <MobileNavLink to="/admin" onClick={toggleMobileMenu} currentPath={location.pathname}>
                      <Shield size={18} className="mr-2" /> Ադմինիստրատորի վահանակ
                    </MobileNavLink>
                  )}
                  <button 
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors flex items-center"
                  >
                    <LogOut size={18} className="mr-2" /> Ելք
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      handleLogin();
                      toggleMobileMenu();
                    }}
                    className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                  >
                    Մուտք գործել
                  </button>
                  <Link 
                    to="/register" 
                    onClick={toggleMobileMenu}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-center hover:bg-blue-200 transition-colors"
                  >
                    Գրանցվել
                  </Link>
                  <Link 
                    to="/admin-login" 
                    onClick={toggleMobileMenu}
                    className="flex items-center text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                  >
                    <Lock className="mr-2 h-4 w-4" /> Ադմինիստրատոր
                  </Link>
                </>
              )}

              <Link 
                to="/appointment" 
                onClick={toggleMobileMenu}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg text-center shadow-button hover:bg-blue-600 button-hover"
              >
                Ամրագրել այցելություն
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

// ─── Subcomponents ─────────────────────────────────────────

const NavLink = ({ to, children, isScrolled, currentPath }) => {
  const isActive = currentPath === to;

  return (
    <Link
      to={to}
      className={`relative px-1 font-medium transition-colors duration-200 ${
        isActive
          ? isScrolled
            ? 'text-gray-800'
            : 'text-white'
          : isScrolled
          ? 'text-gray-800 hover:text-blue-600'
          : 'text-white hover:text-blue-300'
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 rounded-full"></span>
      )}
    </Link>
  );
};

const MobileNavLink = ({ to, onClick, children, currentPath }) => {
  const isActive = currentPath === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative flex items-center py-2 font-medium transition-colors ${
        isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full"></span>
      )}
    </Link>
  );
};

const UserMenu = ({ isScrolled, onLogout, isAdmin, onAdminLogout }) => (
  <div className="flex items-center space-x-4">
    <Link 
      to="/appointment" 
      className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-button hover:bg-blue-600 button-hover"
    >
      Ամրագրել այցելություն
    </Link>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={`rounded-full ${
            isScrolled ? 'text-gray-800 hover:text-blue-600 hover:bg-gray-100' : 'text-white hover:text-blue-200 hover:bg-white/10'
          }`}
        >
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center cursor-pointer">
            <User className="mr-2 h-4 w-4" /> Իմ պրոֆիլը
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/my-appointments" className="flex items-center cursor-pointer">
            <Calendar className="mr-2 h-4 w-4" /> Իմ այցելությունները
          </Link>
        </DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link to="/admin" className="flex items-center cursor-pointer">
              <Shield className="mr-2 h-4 w-4" /> Ադմինիստրատորի վահանակ
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        {isAdmin && (
          <DropdownMenuItem onClick={onAdminLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" /> Ելք (Ադմին)
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" /> Ելք
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);
