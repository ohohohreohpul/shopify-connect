import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Instagram } from "lucide-react";
import { toast } from "sonner";

const Kontakt = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Nachricht gesendet!", {
        description: "Wir melden uns in Kürze bei dir."
      });
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 bg-foreground text-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl mb-6">Kontakt</h1>
            <p className="text-lg md:text-xl text-background/80 max-w-2xl mx-auto">
              Du hast Fragen zu Urban Artery? Du suchst spezielle Motive? 
              Du hast generelles Feedback an uns? Nimm gerne Kontakt auf!
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl md:text-3xl text-foreground mb-8">
                  Unsere Kontaktmöglichkeiten
                </h2>
                
                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-primary flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold uppercase tracking-wider text-sm mb-1 font-stencil">Telefon</h3>
                      <a href="tel:+494029851124" className="text-muted-foreground hover:text-primary transition-colors">
                        +49 40 298 511-24
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Hinterlasse eine Nachricht – wir rufen zurück!
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-primary flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold uppercase tracking-wider text-sm mb-1 font-stencil">Email</h3>
                      <a href="mailto:info@urban-artery.de" className="text-muted-foreground hover:text-primary transition-colors">
                        info@urban-artery.de
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-primary flex items-center justify-center flex-shrink-0">
                      <Instagram className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold uppercase tracking-wider text-sm mb-1 font-stencil">Instagram</h3>
                      <a 
                        href="https://instagram.com/urbanartery" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        PM bei Instagram
                      </a>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Bitte rechne mit 3-5 Werktagen Bearbeitungszeit für Anfragen.
                </p>
              </div>

              {/* Contact Form */}
              <div className="bg-muted p-8">
                <h2 className="text-xl font-bold uppercase tracking-wider mb-6 font-stencil">
                  Kontaktformular
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      name="firstName"
                      placeholder="Vorname" 
                      required
                      className="h-12 bg-background border-0"
                    />
                    <Input 
                      name="lastName"
                      placeholder="Nachname" 
                      required
                      className="h-12 bg-background border-0"
                    />
                  </div>
                  
                  <Input 
                    name="email"
                    type="email"
                    placeholder="E-Mail Adresse" 
                    required
                    className="h-12 bg-background border-0"
                  />
                  
                  <Input 
                    name="orderNumber"
                    placeholder="Bestellnummer (optional)" 
                    className="h-12 bg-background border-0"
                  />
                  
                  <Input 
                    name="subject"
                    placeholder="Betreff" 
                    required
                    className="h-12 bg-background border-0"
                  />
                  
                  <Textarea 
                    name="message"
                    placeholder="Deine Nachricht" 
                    required
                    className="min-h-[150px] bg-background border-0 resize-none"
                  />

                  <p className="text-xs text-muted-foreground">
                    Durch das Ausfüllen und Absenden deiner Daten erklärst du dich mit der{" "}
                    <a href="/datenschutz" className="underline hover:text-primary">Datenschutzrichtlinie</a> einverstanden.
                  </p>
                  
                  <Button 
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 uppercase font-bold text-sm tracking-wider h-14 font-stencil"
                  >
                    {isSubmitting ? "Wird gesendet..." : "Absenden"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Kontakt;
