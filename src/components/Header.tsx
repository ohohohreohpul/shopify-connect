import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { CartDrawer } from "./CartDrawer";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-secondary rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <svg viewBox="0 0 200 60" className="h-12 w-auto">
              <text
                x="10"
                y="28"
                className="fill-primary"
                style={{
                  fontFamily: "'Brush Script MT', cursive",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                URBAN
              </text>
              <text
                x="10"
                y="52"
                className="fill-primary"
                style={{
                  fontFamily: "'Brush Script MT', cursive",
                  fontSize: "32px",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                Artery
              </text>
            </svg>
          </Link>

          {/* Cart */}
          <CartDrawer />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="block text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Startseite
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="block text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Alle Werke
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="block text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Über uns
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="block text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
};
