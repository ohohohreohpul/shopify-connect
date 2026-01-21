import { Link } from "react-router-dom";
import { Shield, BadgeCheck, Truck, Instagram, Facebook } from "lucide-react";
import logoDark from "@/assets/logo-dark.png";
import visaIcon from "@/assets/payment/visa.svg";
import mastercardIcon from "@/assets/payment/mastercard.svg";
import amexIcon from "@/assets/payment/amex.svg";
import paypalIcon from "@/assets/payment/paypal.svg";
import klarnaIcon from "@/assets/payment/klarna.svg";
import googlepayIcon from "@/assets/payment/googlepay.svg";
import applepayIcon from "@/assets/payment/applepay.svg";
import dhlIcon from "@/assets/shipping/dhl.svg";
import upsIcon from "@/assets/shipping/ups.svg";

export const Footer = () => {
  const paymentMethods = [
    { name: 'Visa', icon: visaIcon },
    { name: 'Mastercard', icon: mastercardIcon },
    { name: 'American Express', icon: amexIcon },
    { name: 'PayPal', icon: paypalIcon },
    { name: 'Klarna', icon: klarnaIcon },
    { name: 'Google Pay', icon: googlepayIcon },
    { name: 'Apple Pay', icon: applepayIcon },
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Trust Badges */}
      <div className="border-b border-background/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sichere Bezahlmethoden */}
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 bg-primary flex items-center justify-center flex-shrink-0">
                <Shield className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="uppercase text-sm tracking-wider font-stencil">Sichere Bezahlmethoden</h3>
                <p className="text-sm text-background/60 mt-1">SSL-verschlüsselt & geschützt. Zahle sicher mit Kreditkarte, PayPal oder Klarna.</p>
              </div>
            </div>

            {/* Zufriedenheitsgarantie */}
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 bg-primary flex items-center justify-center flex-shrink-0">
                <BadgeCheck className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="uppercase text-sm tracking-wider font-stencil">Zufriedenheitsgarantie</h3>
                <p className="text-sm text-background/60 mt-1">Dein persönliches Unikat. Wir fertigen mit höchster Sorgfalt speziell für dich. Sollte es dennoch einen Qualitätsmangel geben, sind wir natürlich für dich da.</p>
              </div>
            </div>

            {/* Weltweite Lieferung */}
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 bg-primary flex items-center justify-center flex-shrink-0">
                <Truck className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="uppercase text-sm tracking-wider font-stencil">Weltweite Lieferung</h3>
                <p className="text-sm text-background/60 mt-1 mb-2">Sicher verpackt mit unseren Versandpartnern.</p>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-14 bg-background rounded flex items-center justify-center p-0.5">
                    <img src={dhlIcon} alt="DHL" className="h-full w-full object-contain" />
                  </div>
                  <div className="h-8 w-14 bg-background rounded flex items-center justify-center p-0.5">
                    <img src={upsIcon} alt="UPS" className="h-full w-full object-contain" />
                  </div>
                  <div className="h-8 px-3 bg-[#FFCC00] rounded flex items-center justify-center">
                    <span className="text-[10px] font-bold text-black">DEUTSCHE POST</span>
                  </div>
                </div>
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
          {/* Centered navigation grid */}
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-20 lg:gap-32 mb-16">
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
                    <Link 
                      to={item.path} 
                      className="text-sm text-background/70 link-highlight"
                    >
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
                    <Link 
                      to={item.path} 
                      className="text-sm text-background/70 link-highlight"
                    >
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
                    <Link 
                      to={item.path} 
                      className="text-sm text-background/70 link-highlight"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Logo and Social - Centered above payment */}
          <div className="flex flex-col items-center mb-8">
            <img 
              src={logoDark} 
              alt="Urban Artery" 
              className="h-10 w-auto brightness-0 invert mb-4"
            />
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="h-9 w-9 bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="h-9 w-9 bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Payment Icons & Copyright */}
          <div className="border-t border-background/10 pt-6">
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-wrap justify-center gap-2">
                {paymentMethods.map((method) => (
                  <div 
                    key={method.name}
                    className="h-8 w-12 bg-background rounded flex items-center justify-center p-1.5"
                  >
                    <img 
                      src={method.icon} 
                      alt={method.name} 
                      className="h-full w-full object-contain"
                    />
                  </div>
                ))}
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
