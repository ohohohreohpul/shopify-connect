import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 bg-foreground text-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl">Datenschutz</h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-8">
              <div>
                <h2 className="text-xl font-bold uppercase tracking-wider mb-4 font-stencil">
                  1. Datenschutz auf einen Blick
                </h2>
                <h3 className="text-lg font-bold mb-2">Allgemeine Hinweise</h3>
                <p className="text-muted-foreground">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                  personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene 
                  Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold uppercase tracking-wider mb-4 font-stencil">
                  2. Verantwortliche Stelle
                </h2>
                <p className="text-muted-foreground">
                  Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
                  Urban Artery GmbH<br />
                  [Adresse]<br />
                  Hamburg, Deutschland<br /><br />
                  Telefon: +49 40 298 511-24<br />
                  E-Mail: info@urban-artery.de
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold uppercase tracking-wider mb-4 font-stencil">
                  3. Datenerfassung auf dieser Website
                </h2>
                <h3 className="text-lg font-bold mb-2">Cookies</h3>
                <p className="text-muted-foreground mb-4">
                  Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser 
                  auf Ihrem Endgerät speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher, 
                  effektiver und sicherer zu machen.
                </p>
                
                <h3 className="text-lg font-bold mb-2">Server-Log-Dateien</h3>
                <p className="text-muted-foreground">
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten 
                  Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold uppercase tracking-wider mb-4 font-stencil">
                  4. Ihre Rechte
                </h2>
                <p className="text-muted-foreground">
                  Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten 
                  personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung 
                  sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold uppercase tracking-wider mb-4 font-stencil">
                  5. Bestellungen und Zahlungsabwicklung
                </h2>
                <p className="text-muted-foreground">
                  Zur Abwicklung Ihrer Bestellung speichern wir Ihre Bestelldaten für die Dauer der 
                  gesetzlichen Aufbewahrungspflichten. Die Zahlungsabwicklung erfolgt über externe 
                  Zahlungsdienstleister (z.B. Shopify Payments, PayPal, Klarna).
                </p>
              </div>

              <div className="bg-muted p-6">
                <p className="text-sm text-muted-foreground">
                  <strong>Hinweis:</strong> Dies ist eine vereinfachte Datenschutzerklärung. Für eine 
                  vollständige, rechtskonforme Datenschutzerklärung sollte ein Rechtsanwalt oder ein 
                  spezialisierter Dienst konsultiert werden.
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

export default Datenschutz;
