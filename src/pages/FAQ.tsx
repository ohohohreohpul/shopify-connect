import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Wie lange dauert die Anfertigung meines Kunstwerks?",
      answer: "Die Anfertigung dauert in der Regel 10-14 Werktage. Da jedes Werk von Hand gefertigt wird, kann es je nach Komplexität und Auslastung auch etwas länger dauern. Du erhältst eine Versandbestätigung, sobald dein Werk auf dem Weg zu dir ist."
    },
    {
      question: "Welche Zahlungsmethoden werden akzeptiert?",
      answer: "Wir akzeptieren alle gängigen Zahlungsmethoden: Kreditkarte (Visa, Mastercard, American Express), PayPal, Klarna (Rechnungskauf & Ratenzahlung) sowie Banküberweisung."
    },
    {
      question: "Kann ich mein bestelltes Werk zurückgeben?",
      answer: "Da jedes Kunstwerk individuell für dich angefertigt wird, ist ein Umtausch oder eine Rückgabe grundsätzlich ausgeschlossen. Bei Transportschäden oder Fertigungsmängeln findest du selbstverständlich eine Lösung mit uns. Bitte kontaktiere uns innerhalb von 14 Tagen nach Erhalt."
    },
    {
      question: "In welche Länder liefert ihr?",
      answer: "Wir liefern weltweit! Die Versandkosten und Lieferzeiten variieren je nach Zielland. Innerhalb Deutschlands ist der Versand ab einem Bestellwert von 150€ kostenlos."
    },
    {
      question: "Kann ich auch eigene Fotos verwenden?",
      answer: "Ja, absolut! Du kannst im Konfigurator deine eigenen Fotos hochladen und sie von unseren Künstlern in Street-Art verwandeln lassen. Achte dabei auf eine möglichst hohe Auflösung für das beste Ergebnis."
    },
    {
      question: "Was ist der Unterschied zwischen den verschiedenen Trägermaterialien?",
      answer: "Wir bieten verschiedene Untergründe an: Leinwand für einen klassischen Look, Aluminium-Dibond für einen modernen, edlen Eindruck, und Holz für einen rustikalen, natürlichen Charakter. Jedes Material hat seine eigenen Vorzüge – kontaktiere uns gerne für eine Beratung."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 bg-foreground text-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl mb-6">FAQ</h1>
            <p className="text-lg md:text-xl text-background/80 max-w-2xl mx-auto">
              Ihr fragt, wir antworten
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-muted-foreground mb-10">
                Auf dieser Seite beantworten wir die häufigsten Fragen unserer Kunden und erweitern 
                die Liste stetig. Falls deine Frage hiermit noch nicht beantwortet ist,{" "}
                <Link to="/kontakt" className="text-primary hover:underline">kontaktiere uns gerne</Link> – 
                zum Beispiel über unser Kontaktformular, das Telefon oder unsere Social Media Kanäle.
              </p>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border-2 border-foreground/10 px-6"
                  >
                    <AccordionTrigger className="text-left font-bold uppercase tracking-wider text-sm font-stencil hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-4">
                  Deine Frage war nicht dabei?
                </p>
                <Link 
                  to="/kontakt" 
                  className="text-primary font-bold uppercase tracking-wider text-sm hover:underline font-stencil"
                >
                  Kontaktiere uns →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
