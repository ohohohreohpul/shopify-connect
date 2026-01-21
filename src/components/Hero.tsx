import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative bg-[hsl(50,100%,50%)] overflow-hidden">
      {/* Bold diagonal stripe */}
      <div className="absolute inset-0 bg-primary opacity-10 transform -skew-y-6 origin-top-left scale-150" />
      
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="max-w-3xl">
          {/* Tagline */}
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-4">
            Street Art für Dein Zuhause
          </p>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.9] text-foreground mb-6">
            Echte<br />
            <span className="text-primary">Kunst.</span><br />
            Deine Wand.
          </h1>
          
          {/* Subline */}
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-lg">
            Gestalte dein eigenes Kunstwerk oder wähle aus über 60 handgefertigten Designs unserer Künstler.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Button 
              asChild
              size="lg" 
              className="bg-foreground text-background hover:bg-foreground/90 uppercase font-bold text-sm tracking-wider h-14 px-8"
            >
              <Link to="/">
                Jetzt entdecken
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background uppercase font-bold text-sm tracking-wider h-14 px-8"
            >
              <Link to="/">
                Dein Foto-Kunst
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Bottom accent bar */}
      <div className="h-2 bg-primary" />
    </section>
  );
};
