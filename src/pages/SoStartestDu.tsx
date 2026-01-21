import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Upload, Palette, Truck, CheckCircle } from "lucide-react";

const SoStartestDu = () => {
  const steps = [
    {
      number: "01",
      icon: Upload,
      title: "Foto hochladen",
      description: "Wähle ein Bild aus deiner Galerie oder mache ein neues Foto. Portraits, Landschaften, Haustiere – alles ist möglich."
    },
    {
      number: "02", 
      icon: Palette,
      title: "Stil wählen",
      description: "Entscheide dich für deinen Street-Art Stil. Von klassischem Graffiti bis zu modernem Stencil Art – unsere Künstler setzen deine Vision um."
    },
    {
      number: "03",
      icon: CheckCircle,
      title: "Format bestimmen",
      description: "Wähle die perfekte Größe für dein Kunstwerk. Von kompakt bis XXL – wir haben das richtige Format für jeden Raum."
    },
    {
      number: "04",
      icon: Truck,
      title: "Handgefertigt & Geliefert",
      description: "Unsere Künstler fertigen dein Unikat in 10-14 Tagen. Sicher verpackt kommt es direkt zu dir nach Hause."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-foreground text-background py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6">
                So startest du<br />
                <span className="text-primary">mit Blanks</span>
              </h1>
              <p className="text-xl md:text-2xl text-background/80 max-w-2xl">
                Von deinem Foto zum handgefertigten Street-Art Unikat. 
                In nur wenigen Schritten zu deinem persönlichen Kunstwerk.
              </p>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              {steps.map((step) => (
                <div key={step.number} className="group">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 bg-primary flex items-center justify-center">
                        <step.icon className="h-8 w-8 text-primary-foreground" />
                      </div>
                    </div>
                    <div>
                      <span className="text-primary text-sm font-bold tracking-wider">SCHRITT {step.number}</span>
                      <h3 className="text-2xl md:text-3xl mt-2 mb-4">{step.title}</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl text-primary-foreground mb-6">
              Bereit loszulegen?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Starte jetzt mit dem Konfigurator und gestalte dein persönliches Street-Art Kunstwerk.
            </p>
            <Button 
              asChild
              size="lg" 
              className="bg-foreground text-background hover:bg-foreground/90 uppercase font-bold tracking-wider h-14 px-10 font-stencil"
            >
              <Link to="/konfigurator">
                Zum Konfigurator
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-4xl mb-4">Noch Fragen?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              In unseren FAQs findest du Antworten auf die häufigsten Fragen rund um Bestellung, Versand und mehr.
            </p>
            <Link to="/faq">
              <Button 
                variant="outline" 
                size="lg"
                className="uppercase font-bold tracking-wider h-14 px-10 font-stencil"
              >
                Zu den FAQs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SoStartestDu;
