import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import logoWhite from "@/assets/logo-white.png";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-header">
      {/* Top bar - hidden for now */}
      {/* <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <p className="text-xs text-center font-bold uppercase tracking-wider font-stencil">
            Kostenloser Versand ab 150€ · Handgefertigt in Deutschland
          </p>
        </div>
      </div> */}

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-header-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          {/* Spacer for desktop to keep logo centered */}
          <div className="hidden md:block w-10" />

          {/* Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <img 
              src={logoWhite} 
              alt="Urban Artery" 
              className="h-10 md:h-14 w-auto"
            />
          </Link>

          {/* Cart */}
          <CartDrawer />
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block border-t border-header-foreground/20">
        <div className="container mx-auto px-4">
          <ul className="flex justify-center gap-8 py-3">
            {[
              { name: 'Inspiration', path: '/inspiration' },
              { name: 'Über uns', path: '/ueber-uns' },
              { name: 'Auftragsarbeiten', path: '/auftragsarbeiten' },
              { name: 'Kontakt', path: '/kontakt' },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    "text-xs font-bold uppercase tracking-wider font-stencil text-header-foreground link-highlight",
                    location.pathname === item.path && "text-primary"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-header border-t border-header-foreground/20">
          <div className="container mx-auto px-4 py-6">
            <ul className="space-y-4">
              {[
                { name: 'Startseite', path: '/' },
                { name: 'Inspiration', path: '/inspiration' },
                { name: 'Über uns', path: '/ueber-uns' },
                { name: 'Auftragsarbeiten', path: '/auftragsarbeiten' },
                { name: 'Kontakt', path: '/kontakt' },
                { name: 'FAQ', path: '/faq' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={cn(
                      "inline-block text-lg font-bold uppercase tracking-wider font-stencil text-header-foreground link-highlight",
                      location.pathname === item.path && "text-primary"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
};
