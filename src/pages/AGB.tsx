import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const AGB = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 bg-foreground text-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl">AGB & Widerrufsrecht</h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-8">
              <div>
                <h2 className="text-xl font-bold uppercase tracking-wider mb-4 font-stencil">
                  § 1 Geltungsbereich
                </h2>
                <p className="text-muted-foreground">
                  Für alle Bestellungen über unseren Online-Shop gelten die nachfolgenden AGB. 
                  Der Online-Shop richtet sich ausschließlich an Verbraucher.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold uppercase tracking-wider mb-4 font-stencil">
                  § 2 Vertragspartner
                </h2>
                <p className="text-muted-foreground">
                  Der Kaufvertrag kommt zustande mit Urban Artery GmbH, Hamburg.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold uppercase tracking-wider mb-4 font-stencil">
                  § 3 Vertragsschluss
                </h2>
                <p className="text-muted-foreground">
                  Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot dar. 
                  Durch das Absenden einer Bestellung geben Sie eine verbindliche Bestellung ab. 
                  Der Vertrag kommt zustande, wenn wir die Bestellung durch eine Auftragsbestätigung per E-Mail annehmen.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold uppercase tracking-wider mb-4 font-stencil">
                  § 4 Preise und Zahlung
                </h2>
                <p className="text-muted-foreground">
                  Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer zuzüglich Versandkosten. 
                  Wir akzeptieren Zahlung per Kreditkarte, PayPal und Klarna.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold uppercase tracking-wider mb-4 font-stencil">
                  § 5 Lieferung
                </h2>
                <p className="text-muted-foreground">
                  Die Lieferzeit beträgt ca. 10-14 Werktage für die Anfertigung plus Versandzeit. 
                  Bei Lieferungen ins Ausland können Zölle, Steuern und Gebühren anfallen.
                </p>
              </div>

              <div className="border-t-2 border-foreground/10 pt-8">
                <h2 className="text-2xl font-bold uppercase tracking-wider mb-6 font-stencil text-primary">
                  Widerrufsbelehrung
                </h2>
                
                <h3 className="text-lg font-bold mb-2">Widerrufsrecht</h3>
                <p className="text-muted-foreground mb-4">
                  Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
                </p>
                
                <h3 className="text-lg font-bold mb-2">Ausnahmen vom Widerrufsrecht</h3>
                <p className="text-muted-foreground mb-4">
                  Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von Waren, die nicht vorgefertigt 
                  sind und für deren Herstellung eine individuelle Auswahl oder Bestimmung durch den Verbraucher 
                  maßgeblich ist. Da alle unsere Kunstwerke individuell nach Kundenwunsch angefertigt werden, 
                  ist ein Widerruf grundsätzlich ausgeschlossen.
                </p>

                <h3 className="text-lg font-bold mb-2">Widerrufsformular</h3>
                <p className="text-muted-foreground">
                  Sollte ein Widerrufsrecht bestehen, können Sie uns Ihren Widerruf formlos per E-Mail an 
                  info@urban-artery.de oder postalisch mitteilen.
                </p>
              </div>

              <div className="bg-muted p-6">
                <p className="text-sm text-muted-foreground">
                  <strong>Hinweis:</strong> Dies ist eine vereinfachte Version der AGB. Für vollständige, 
                  rechtskonforme AGB sollte ein Rechtsanwalt konsultiert werden.
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

export default AGB;
