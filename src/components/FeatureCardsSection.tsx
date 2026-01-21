import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";

interface FeatureCard {
  title: string;
  subtitle: string;
  link: string;
  linkText: string;
  bgColor: string;
}

export const FeatureCardsSection = () => {
  const cards: FeatureCard[] = [
    {
      title: "Auftragsarbeiten",
      subtitle: "Individueller geht es nicht!",
      link: "/auftragsarbeiten",
      linkText: "Mehr erfahren",
      bgColor: "bg-foreground"
    },
    {
      title: "Unsere Story",
      subtitle: "Die Leidenschaft für Urban Art. Erfahrt mehr über die Idee und das Team.",
      link: "/ueber-uns",
      linkText: "Mehr erfahren",
      bgColor: "bg-foreground"
    },
    {
      title: "So startest du mit Blanks",
      subtitle: "Von deinem Foto zum Street-Art Unikat. So einfach geht's.",
      link: "/so-startest-du",
      linkText: "Mehr erfahren",
      bgColor: "bg-foreground"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Link 
              key={index}
              to={card.link}
              className="group block"
            >
              <div className={`${card.bgColor} p-8 h-full flex flex-col min-h-[400px] transition-all duration-300 group-hover:bg-primary`}>
                {/* Logo */}
                <div className="flex-1 flex items-center justify-center py-8">
                  <img 
                    src={logoWhite} 
                    alt="Urban Artery" 
                    className="w-48 md:w-56 h-auto opacity-90"
                  />
                </div>
                
                {/* Content */}
                <div className="mt-auto">
                  <h3 className="text-xl font-stencil uppercase text-background mb-2">
                    {card.title}
                  </h3>
                  <p className="text-background/70 text-sm mb-4 group-hover:text-background/90">
                    {card.subtitle}
                  </p>
                  <span className="inline-flex items-center text-primary text-sm font-medium uppercase tracking-wider group-hover:text-background">
                    {card.linkText}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
