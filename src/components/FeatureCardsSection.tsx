import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import featureAuftragsarbeiten from "@/assets/feature-auftragsarbeiten.jpg";
import featureStory from "@/assets/feature-story.jpg";
import featureBlanks from "@/assets/feature-blanks.jpg";

interface FeatureCard {
  title: string;
  subtitle: string;
  link: string;
  linkText: string;
  image: string;
}

export const FeatureCardsSection = () => {
  const cards: FeatureCard[] = [
    {
      title: "Auftragsarbeiten",
      subtitle: "Individueller geht es nicht!",
      link: "/auftragsarbeiten",
      linkText: "Mehr erfahren",
      image: featureAuftragsarbeiten
    },
    {
      title: "Unsere Story",
      subtitle: "Die Leidenschaft für Urban Art. Erfahrt mehr über die Idee und das Team.",
      link: "/ueber-uns",
      linkText: "Mehr erfahren",
      image: featureStory
    },
    {
      title: "So startest du mit Blanks",
      subtitle: "Von deinem Foto zum Street-Art Unikat. So einfach geht's.",
      link: "/so-startest-du",
      linkText: "Mehr erfahren",
      image: featureBlanks
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
              <div 
                className="relative h-[450px] overflow-hidden"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-stencil uppercase text-background mb-2">
                    {card.title}
                  </h3>
                  <p className="text-background/80 text-sm mb-4 line-clamp-2">
                    {card.subtitle}
                  </p>
                  <span className="inline-flex items-center text-primary text-sm font-medium uppercase tracking-wider group-hover:text-background transition-colors">
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
