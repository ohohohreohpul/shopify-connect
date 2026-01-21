import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SoGehts = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 bg-foreground text-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl mb-6">So funktioniert's</h1>
            <p className="text-lg md:text-xl text-background/80 max-w-2xl mx-auto">
              Dein Weg zum maßgeschneiderten Kunstwerk
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-muted-foreground mb-8">
                Es ist ganz einfach: Du nutzt unseren Konfigurator, um dein eigenes Werk zu erstellen. 
                Hier kannst du zunächst Größe, Format und Untergrund festlegen und dich dann aus 
                unserer Datenbank an Motiven bedienen.
              </p>

              <p className="text-lg text-muted-foreground mb-8">
                Und natürlich kannst du auch dein eigenes Foto hochladen und für deine Gestaltung 
                nutzen. Wenn du dein Werk im Konfigurator fertig gestaltet hast, kannst du im 
                letzten Schritt noch Sonderwünsche für deine Bestellung angeben. Danach drückst 
                du auf "Bestellen" und unser Kreativteam legt los.
              </p>

              {/* Steps */}
              <div className="space-y-8 my-12">
                <div className="flex gap-6">
                  <div className="h-12 w-12 bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold flex-shrink-0 font-stencil">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wider mb-2 font-stencil">
                      Größe & Format wählen
                    </h3>
                    <p className="text-muted-foreground">
                      Bestimme die Maße und das Format deines Kunstwerks passend zu deinem Raum.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="h-12 w-12 bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold flex-shrink-0 font-stencil">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wider mb-2 font-stencil">
                      Motiv auswählen oder hochladen
                    </h3>
                    <p className="text-muted-foreground">
                      Wähle aus unserer Galerie oder lade dein eigenes Foto hoch.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="h-12 w-12 bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold flex-shrink-0 font-stencil">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wider mb-2 font-stencil">
                      Design gestalten
                    </h3>
                    <p className="text-muted-foreground">
                      Kombiniere Elemente und passe dein Werk im Konfigurator an.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="h-12 w-12 bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold flex-shrink-0 font-stencil">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wider mb-2 font-stencil">
                      Bestellen & Anfertigung
                    </h3>
                    <p className="text-muted-foreground">
                      Nach deiner Bestellung wird dein Kunstwerk von Hand gefertigt und sicher verpackt zu dir geliefert.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 uppercase font-bold text-sm tracking-wider h-14 px-8 font-stencil"
                >
                  <Link to="/konfigurator">
                    Zum Konfigurator
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Link */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg text-muted-foreground mb-4">
              Noch Fragen? Schau in unsere FAQ oder kontaktiere uns direkt.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-foreground hover:bg-foreground hover:text-background uppercase font-bold text-sm tracking-wider h-12 px-6 font-stencil"
              >
                <Link to="/faq">FAQ ansehen</Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-foreground hover:bg-foreground hover:text-background uppercase font-bold text-sm tracking-wider h-12 px-6 font-stencil"
              >
                <Link to="/kontakt">Kontakt</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SoGehts;
