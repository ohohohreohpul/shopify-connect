import { Link } from "react-router-dom";
import { Shield, BadgeCheck, Truck, Instagram, Facebook } from "lucide-react";
import logoDark from "@/assets/logo-dark.png";

export const Footer = () => {
  return (
    <footer>
      {/* Trust Badges - White Background */}
      <div className="bg-background py-16 border-b border-foreground/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center gap-4">
              <Shield className="h-12 w-12 text-foreground stroke-[1.5]" />
              <div>
                <h3 className="uppercase text-sm tracking-wider font-stencil text-foreground">Sichere Bezahlmethoden</h3>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <BadgeCheck className="h-12 w-12 text-foreground stroke-[1.5]" />
              <div>
                <h3 className="uppercase text-sm tracking-wider font-stencil text-foreground">Unsere Zufriedenheitsgarantie</h3>
                <p className="text-sm text-foreground/60 mt-1">Passt nicht? Schick's zurück.<br />30 Tage lang.</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <Truck className="h-12 w-12 text-foreground stroke-[1.5]" />
              <div>
                <h3 className="uppercase text-sm tracking-wider font-stencil text-foreground">Weltweite Lieferung</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer with background image */}
      <div 
        className="py-16 bg-foreground text-background relative"
        style={{
          backgroundImage: 'url(/images/footer-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Hilfe links */}
            <div>
              <h3 className="uppercase text-sm tracking-wider mb-6 font-stencil">Hilfe</h3>
              <ul className="space-y-3">
                {[
                  { name: 'So funktioniert\'s', path: '/so-gehts' },
                  { name: 'FAQs', path: '/faq' },
                  { name: 'Verpackung & Versand', path: '/versand' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-sm text-background/70 hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Urban Artery links */}
            <div>
              <h3 className="uppercase text-sm tracking-wider mb-6 font-stencil">Urban Artery</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Über Urban Artery', path: '/ueber-uns' },
                  { name: 'Auftragsarbeiten', path: '/auftragsarbeiten' },
                  { name: 'Nimm Kontakt auf', path: '/kontakt' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-sm text-background/70 hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rechtliches links */}
            <div>
              <h3 className="uppercase text-sm tracking-wider mb-6 font-stencil">Rechtliches</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Impressum', path: '/impressum' },
                  { name: 'Datenschutz', path: '/datenschutz' },
                  { name: 'AGB & Widerrufsrecht', path: '/agb' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-sm text-background/70 hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Brand */}
            <div className="flex flex-col items-start md:items-end">
              <img 
                src={logoDark} 
                alt="Urban Artery" 
                className="h-12 w-auto brightness-0 invert mb-6"
              />
              <div className="flex gap-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment methods & Copyright */}
      <div className="bg-foreground border-t border-background/10 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
            {/* Payment Icons */}
            <div className="flex flex-wrap justify-center gap-2">
              {['amex', 'apple-pay', 'mastercard', 'visa', 'paypal', 'klarna', 'google-pay'].map((payment) => (
                <div 
                  key={payment}
                  className="h-8 w-12 bg-background rounded flex items-center justify-center text-[10px] uppercase font-medium text-foreground"
                >
                  {payment === 'apple-pay' ? 'Pay' : 
                   payment === 'google-pay' ? 'GPay' : 
                   payment.charAt(0).toUpperCase() + payment.slice(1, 4)}
                </div>
              ))}
            </div>
            <p className="text-xs text-center text-background/40 uppercase tracking-wider font-stencil">
              © {new Date().getFullYear()} Urban Artery. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
