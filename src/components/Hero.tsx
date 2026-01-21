import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HERO_VIDEO_URL = "https://cdn.shopify.com/videos/c/o/v/f6553138823543e7a732c900a191f151.mov";

export const Hero = () => {
  return <section className="relative bg-foreground overflow-hidden min-h-[70vh] md:min-h-[80vh] flex items-center justify-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src={HERO_VIDEO_URL} type="video/quicktime" />
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-foreground/50" />
      </div>
      
      <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main headline only */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl leading-[0.95] text-background font-stencil uppercase mb-8">
            Dein Street-Art Unikat.
          </h1>
          
          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 uppercase font-bold text-sm tracking-wider h-14 px-8 font-stencil">
              <Link to="/">
                Jetzt entdecken
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-background text-background hover:bg-background hover:text-foreground uppercase font-bold text-sm tracking-wider h-14 px-8 font-stencil bg-transparent">
              <Link to="/">
                Dein Foto-Kunst
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
