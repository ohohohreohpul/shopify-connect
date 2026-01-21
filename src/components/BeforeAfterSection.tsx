import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

// Placeholder images - replace with actual before/after images
const FOTO_KUNST_BEFORE = "https://images.unsplash.com/photo-1602030028438-4cf153cbae9e?w=800&q=80";
const FOTO_KUNST_AFTER = "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80";

const QUER_HOCH_BEFORE = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80";
const QUER_HOCH_AFTER = "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80";

export const BeforeAfterSection = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Aus Foto wird Kunst */}
          <div>
            <h2 className="text-2xl md:text-3xl text-foreground mb-6 text-center">
              Aus Foto wird Kunst
            </h2>
            <BeforeAfterSlider
              beforeImage={FOTO_KUNST_BEFORE}
              afterImage={FOTO_KUNST_AFTER}
              beforeAlt="Original photo"
              afterAlt="Street art transformation"
            />
            <div className="mt-6 text-center">
              <p className="text-muted-foreground mb-4">
                Lade dein Lieblingsfoto hoch und unsere Künstler verwandeln es in ein einzigartiges Street-Art Werk.
              </p>
              <Button 
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 uppercase font-bold text-sm tracking-wider h-12 px-6 font-stencil"
              >
                <Link to="/">
                  Jetzt gestalten
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Aus quer wird hoch */}
          <div>
            <h2 className="text-2xl md:text-3xl text-foreground mb-6 text-center">
              Aus quer wird hoch
            </h2>
            <BeforeAfterSlider
              beforeImage={QUER_HOCH_BEFORE}
              afterImage={QUER_HOCH_AFTER}
              beforeAlt="Original landscape photo"
              afterAlt="Extended portrait format"
            />
            <div className="mt-6 text-center">
              <p className="text-muted-foreground mb-4">
                Wir erweitern dein Foto mit KI für das perfekte Format – ohne dabei Details zu verlieren.
              </p>
              <Button 
                asChild
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 uppercase font-bold text-sm tracking-wider h-12 px-6 font-stencil"
              >
                <Link to="/">
                  Mehr erfahren
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
