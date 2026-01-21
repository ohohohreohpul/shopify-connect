import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail } from "lucide-react";

export const StorySection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Auftragsarbeiten */}
          <div className="bg-foreground text-background p-8 md:p-12">
            <p className="text-xs font-bold uppercase tracking-wider text-primary mb-4 font-stencil">
              Auftragsarbeiten
            </p>
            <h2 className="text-3xl md:text-4xl mb-6">
              Individueller geht es nicht!
            </h2>
            <p className="text-background/70 mb-8">
              Du willst es richtig custom made? Mit ganz vielen Sonderwünschen? 
              Dann ist eine Auftragsarbeit genau das Richtige für dich!
            </p>
            <Button 
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 uppercase font-bold text-sm tracking-wider h-12 px-6 font-stencil"
            >
              <Link to="/auftragsarbeiten">
                Mehr erfahren
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Right: Unsere Story + Kontakt */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary mb-4 font-stencil">
              Unsere Story
            </p>
            <h2 className="text-2xl md:text-3xl text-foreground mb-6">
              Darum gibt es Urban Artery
            </h2>
            <p className="text-muted-foreground mb-6">
              Zwei Dinge waren für uns ausschlaggebend, Urban Artery zu gründen: 
              Die Leidenschaft für Urban Art. Und die Idee, Kunstwerken eine 
              persönliche Note geben zu können.
            </p>
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-foreground hover:bg-foreground hover:text-background uppercase font-bold text-sm tracking-wider h-12 px-6 font-stencil mb-8"
            >
              <Link to="/ueber-uns">
                mehr erfahren
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            {/* Kontakt */}
            <div className="border-t-2 border-foreground/10 pt-8">
              <h3 className="text-lg font-bold uppercase tracking-wider mb-4 font-stencil">
                Brauchst Du Hilfe?
              </h3>
              <p className="text-muted-foreground mb-4">Unsere Kontaktmöglichkeiten</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <a href="tel:+494029851124" className="hover:text-primary transition-colors">
                    +49 40 298 511-24
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href="mailto:info@urban-artery.de" className="hover:text-primary transition-colors">
                    info@urban-artery.de
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
