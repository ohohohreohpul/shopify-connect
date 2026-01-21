import { Link } from "react-router-dom";
import { Shield, BadgeCheck, Truck, Instagram, Facebook } from "lucide-react";
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
                <h3 className="uppercase text-sm tracking-wider font-stencil">Sichere Bezahlmethoden</h3>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 bg-primary flex items-center justify-center">
                <BadgeCheck className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="uppercase text-sm tracking-wider font-stencil">Zufriedenheitsgarantie</h3>
                <p className="text-sm text-background/60">30 Tage Rückgaberecht</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 bg-primary flex items-center justify-center">
                <Truck className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="uppercase text-sm tracking-wider font-stencil">Weltweite Lieferung</h3>
                <p className="text-sm text-background/60">Sicher verpackt</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer with background image */}
      <div 
        className="pt-16 pb-8 relative"
        style={{
          backgroundImage: 'url(/images/footer-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
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

          {/* Payment Icons & Copyright - same section */}
          <div className="border-t border-background/10 pt-6">
            <div className="flex flex-col items-center gap-4">
              {/* Payment Icons */}
              <div className="flex flex-wrap justify-center gap-2">
                <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/0169695890db3db16bfe.svg" alt="American Express" className="h-8" />
                <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/ae9ceec48b1dc489596c.svg" alt="Apple Pay" className="h-8" />
                <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/f11b90c2972f3811f2d5.svg" alt="Google Pay" className="h-8" />
                <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/0e58891c7bb9c2c2ad2f.svg" alt="Klarna" className="h-8" />
                <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/37fc607cb2a22ff4a799.svg" alt="Maestro" className="h-8" />
                <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/5e2d37aa68a62c3d1f15.svg" alt="Mastercard" className="h-8" />
                <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/925e1310ee335ea61faa.svg" alt="PayPal" className="h-8" />
                <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/f24f2f4ebe77b7e00f7d.svg" alt="Shop Pay" className="h-8" />
                <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/4fae6e4c47f58deb4c38.svg" alt="Visa" className="h-8" />
              </div>
              <p className="text-xs text-center text-background/40 uppercase tracking-wider font-stencil">
                © {new Date().getFullYear()} Urban Artery. Alle Rechte vorbehalten.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
