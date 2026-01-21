import { Link } from "react-router-dom";
import { Shield, Clock, Truck, Instagram, Facebook } from "lucide-react";
import logoDark from "@/assets/logo-dark.png";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Trust Badges */}
      <div className="border-b border-background/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 bg-primary flex items-center justify-center">
                <Shield className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="uppercase text-sm tracking-wider">Sichere Zahlung</h3>
                <p className="text-sm text-background/60">Verschlüsselt & geschützt</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 bg-primary flex items-center justify-center">
                <Clock className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="uppercase text-sm tracking-wider">Handgefertigt</h3>
                <p className="text-sm text-background/60">10-14 Tage Anfertigung</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 bg-primary flex items-center justify-center">
                <Truck className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="uppercase text-sm tracking-wider">Weltweiter Versand</h3>
                <p className="text-sm text-background/60">Sicher verpackt</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <img 
                src={logoDark} 
                alt="Urban Artery" 
                className="h-16 w-auto brightness-0 invert mb-6"
              />
              <p className="text-sm text-background/60 mb-6">
                Echte Street-Art für Dein Zuhause. Handgefertigt von unseren Künstlern.
              </p>
              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Shop links */}
            <div>
              <h3 className="uppercase text-sm tracking-wider mb-6">Shop</h3>
              <ul className="space-y-3">
                {[
                  { name: 'So funktioniert\'s', path: '/so-gehts' },
                  { name: 'Auftragsarbeiten', path: '/auftragsarbeiten' },
                  { name: 'Verpackung & Versand', path: '/versand' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-sm text-background/60 hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info links */}
            <div>
              <h3 className="uppercase text-sm tracking-wider mb-6">Hilfe</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Über uns', path: '/ueber-uns' },
                  { name: 'FAQ', path: '/faq' },
                  { name: 'Kontakt', path: '/kontakt' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-sm text-background/60 hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal links */}
            <div>
              <h3 className="uppercase text-sm tracking-wider mb-6">Rechtliches</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Impressum', path: '/impressum' },
                  { name: 'Datenschutz', path: '/datenschutz' },
                  { name: 'AGB & Widerrufsrecht', path: '/agb' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-sm text-background/60 hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-background/10 py-6">
        <div className="container mx-auto px-4">
          <p className="text-xs text-center text-background/40 uppercase tracking-wider font-stencil">
            © {new Date().getFullYear()} Urban Artery. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};
