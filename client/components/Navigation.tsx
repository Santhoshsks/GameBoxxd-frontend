import { Search, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./ThemeToggle";
import { UserContext } from '@/contexts/UserContext';
import { account } from '@/appwriteClient';
import { useContext, useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Navigation() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const { user, loading, setUser } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  
  useEffect(() => {
      function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setDropdownOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      navigate('/login');
    } catch {
      // handle errors if any
    }
  };

  if (loading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <div>Loading...</div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                G
              </span>
            </div>
            <span className="font-bold text-xl">GameBoxxd</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/"
              className={`hover:text-primary transition-colors ${
                isActive("/") ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Discover
            </Link>
            <Link
              to="/lists"
              className={`hover:text-primary transition-colors ${
                isActive("/lists") ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Lists
            </Link>
            <Link
              to="/games"
              className={`hover:text-primary transition-colors ${
                isActive("/games") ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Games
            </Link>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Popular
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Browse
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              News
            </a>
          </nav>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search games, developers, platforms..."
              className="pl-10 bg-muted/50 border-0 focus-visible:ring-1"
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-2 relative" ref={dropdownRef}>
          <ThemeToggle />
          {user ? (
            <>
              <Avatar
                className="h-8 w-8 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user.photo ? (
                  <AvatarImage src={user.photo} />
                ) : (
                  <AvatarFallback>
                    {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-20">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="inline-block mr-1" /> Sign out
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Log in
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
