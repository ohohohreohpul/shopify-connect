import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Impressum = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 bg-foreground text-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl">Impressum</h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <h2 className="text-xl font-bold uppercase tracking-wider mb-4 font-stencil">
                Angaben gemäß § 5 TMG
              </h2>
              <p className="text-muted-foreground mb-6">
                Urban Artery GmbH<br />
                [Straße und Hausnummer]<br />
                [PLZ] Hamburg<br />
                Deutschland
              </p>

              <h2 className="text-xl font-bold uppercase tracking-wider mb-4 font-stencil">
                Kontakt
              </h2>
              <p className="text-muted-foreground mb-6">
                Telefon: +49 40 298 511-24<br />
                E-Mail: info@urban-artery.de
              </p>

              <h2 className="text-xl font-bold uppercase tracking-wider mb-4 font-stencil">
                Vertreten durch
              </h2>
              <p className="text-muted-foreground mb-6">
                Geschäftsführer: Heiko Willers, Daniela Willers, René S. Spiegelberger
              </p>

              <h2 className="text-xl font-bold uppercase tracking-wider mb-4 font-stencil">
                Registereintrag
              </h2>
              <p className="text-muted-foreground mb-6">
                Eintragung im Handelsregister.<br />
                Registergericht: [Amtsgericht]<br />
                Registernummer: [HRB Nummer]
              </p>

              <h2 className="text-xl font-bold uppercase tracking-wider mb-4 font-stencil">
                Umsatzsteuer-ID
              </h2>
              <p className="text-muted-foreground mb-6">
                Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz:<br />
                DE [Nummer]
              </p>

              <h2 className="text-xl font-bold uppercase tracking-wider mb-4 font-stencil">
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
              </h2>
              <p className="text-muted-foreground mb-6">
                Heiko Willers<br />
                [Adresse wie oben]
              </p>

              <h2 className="text-xl font-bold uppercase tracking-wider mb-4 font-stencil">
                Streitschlichtung
              </h2>
              <p className="text-muted-foreground mb-6">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                <a href="https://ec.europa.eu/consumers/odr" className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                  https://ec.europa.eu/consumers/odr
                </a>
                <br /><br />
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>

              <div className="bg-muted p-6 mt-8">
                <p className="text-sm text-muted-foreground">
                  <strong>Hinweis:</strong> Die Platzhalter [in eckigen Klammern] müssen mit den 
                  tatsächlichen Unternehmensdaten ersetzt werden.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Impressum;
