import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Truck, Package, Clock, Shield } from "lucide-react";

const Versand = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 bg-foreground text-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl mb-6">Verpackung & Versand</h1>
            <p className="text-lg md:text-xl text-background/80 max-w-2xl mx-auto">
              Sicher verpackt und zu dir geliefert
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="flex gap-4">
                  <div className="h-12 w-12 bg-primary flex items-center justify-center flex-shrink-0">
                    <Package className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-wider text-sm mb-2 font-stencil">
                      Sichere Verpackung
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Jedes Kunstwerk wird sorgfältig verpackt, um Transportschäden zu vermeiden.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 bg-primary flex items-center justify-center flex-shrink-0">
                    <Truck className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-wider text-sm mb-2 font-stencil">
                      Weltweiter Versand
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Wir liefern in alle Länder. Versandkosten variieren je nach Ziel.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 bg-primary flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-wider text-sm mb-2 font-stencil">
                      10-14 Tage Anfertigung
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Jedes Werk wird individuell für dich handgefertigt.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 bg-primary flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-wider text-sm mb-2 font-stencil">
                      Versicherter Versand
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Alle Sendungen sind gegen Verlust und Beschädigung versichert.
                    </p>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold uppercase tracking-wider mb-4 font-stencil">
                    Versandkosten Deutschland
                  </h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>Ab 150€ Bestellwert:</strong> Kostenloser Versand</li>
                    <li>• <strong>Unter 150€:</strong> 9,90€ Versandpauschale</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold uppercase tracking-wider mb-4 font-stencil">
                    Internationaler Versand
                  </h2>
                  <p className="text-muted-foreground">
                    Wir versenden weltweit. Die Versandkosten werden im Checkout basierend auf 
                    deinem Standort berechnet. Bei Fragen zum internationalen Versand kontaktiere 
                    uns gerne.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold uppercase tracking-wider mb-4 font-stencil">
                    Lieferzeit
                  </h2>
                  <p className="text-muted-foreground">
                    Da jedes Kunstwerk individuell angefertigt wird, beträgt die Produktionszeit 
                    ca. 10-14 Werktage. Hinzu kommt die Versandzeit (Deutschland: 2-3 Werktage, 
                    EU: 5-7 Werktage, International: 7-14 Werktage).
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold uppercase tracking-wider mb-4 font-stencil">
                    Verpackung
                  </h2>
                  <p className="text-muted-foreground">
                    Wir verwenden hochwertige, stabile Verpackungsmaterialien, um dein Kunstwerk 
                    optimal zu schützen. Jedes Werk wird einzeln in säurefreies Papier eingeschlagen 
                    und in einem maßgefertigten Karton versendet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Versand;
