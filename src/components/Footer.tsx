import { Link } from "react-router-dom";
import { Shield, Clock, Truck } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      {/* Brand Logos */}
      <div className="py-12 overflow-hidden">
        <div className="flex justify-center gap-8 md:gap-16">
          {[1, 2, 3].map((i) => (
            <svg key={i} viewBox="0 0 200 60" className="h-16 md:h-24 w-auto opacity-80">
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
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Shield className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Sichere Bezahlmethoden</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Unsere Ziel-Anfertigungszeiten<br />ca. 10-14 Tage
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Truck className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Weltweite Lieferung</p>
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            <div>
              <h3 className="font-semibold mb-3 text-foreground">Shop</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/" className="hover:text-primary transition-colors">Alle Werke</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Neue Motive</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Foto-Kunst</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Geschenkgutschein</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-foreground">Urban Artery</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/" className="hover:text-primary transition-colors">Über uns</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">FAQ & Hilfe</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Widerrufsbelehrung</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Kontaktiere uns</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-foreground">Rechtliches</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/" className="hover:text-primary transition-colors">Impressum</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Datenschutz</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">AGB</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border py-4">
        <div className="container mx-auto px-4">
          <p className="text-xs text-center text-muted-foreground">
            © {new Date().getFullYear()} Urban Artery. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};
