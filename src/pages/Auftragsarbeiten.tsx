import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Auftragsarbeiten = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 bg-foreground text-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl mb-6">Auftragsarbeiten</h1>
            <p className="text-3xl md:text-4xl text-primary">
              Geht nicht gibt's nicht.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-muted-foreground mb-8">
                Du findest im Konfigurator nicht die passenden Designelemente, die von dir gewünschte 
                Größe oder Trägermaterialien werden nicht angeboten? Du willst es richtig custom made 
                und hast ganz viele Sonderwünsche? Du möchtest von uns oder einem unserer Künstler 
                persönlich beraten werden? Dann ist eine Auftragsarbeit genau das Richtige für dich!
              </p>

              <h2 className="text-2xl md:text-3xl text-foreground mb-6">
                Wie funktionieren Auftragsarbeiten bei Urban Artery?
              </h2>
              
              <p className="text-lg text-muted-foreground mb-6">
                In einem Beratungsgespräch per Telefon oder Videokonferenz erzählst du uns von deinen 
                Vorstellungen und Wünschen. Der passende Künstler wird daraufhin einen digitalen 
                Gestaltungsvorschlag anlegen. Mithilfe dieses Vorschlags stimmen wir uns weiter ab – 
                bis das perfekte Werk skizziert ist.
              </p>

              <p className="text-lg text-muted-foreground mb-6">
                Deiner Fantasie sind dabei so gut wie keine Grenzen gesetzt. Wenn alles stimmt, 
                kalkulieren wir dir die Kosten und das Werk wird für dich handgefertigt.
              </p>

              <p className="text-lg text-muted-foreground mb-8">
                Nimm also einfach Kontakt zu uns auf - entweder über das{" "}
                <Link to="/kontakt" className="text-primary hover:underline">Kontaktformular</Link>, 
                unsere Hotline oder per Email an:{" "}
                <a href="mailto:info@urban-artery.de" className="text-primary hover:underline">
                  info@urban-artery.de
                </a>
              </p>

              <div className="bg-primary/10 border-l-4 border-primary p-6 mb-10">
                <p className="text-foreground font-medium">
                  <strong>Pssst:</strong> Ein so individuell gefertigtes Werk erzählt eine ganz besondere 
                  Geschichte und ist auch ein tolles Geschenk zu einem besonderen Anlass wie einem runden 
                  Geburtstag, Hochzeit oder Firmenjubiläum.
                </p>
              </div>

              <div className="text-center">
                <Button 
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 uppercase font-bold text-sm tracking-wider h-14 px-8 font-stencil"
                >
                  <Link to="/kontakt">
                    Jetzt Kontakt aufnehmen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Auftragsarbeiten;
