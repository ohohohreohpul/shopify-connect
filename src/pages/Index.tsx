import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductSection } from "@/components/ProductSection";
import { Footer } from "@/components/Footer";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight } from "lucide-react";

const Index = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(64);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Fehler beim Laden');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const featuredProducts = products.slice(0, 8);
  const topSeller = products.slice(8, 16);
  const newArrivals = products.slice(16, 24);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      <main>
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-32 text-destructive">
            <p className="text-lg font-bold uppercase">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-xl font-bold uppercase text-foreground">Keine Produkte gefunden</p>
            <p className="text-muted-foreground mt-2">
              Erstelle dein erstes Produkt im Chat.
            </p>
          </div>
        ) : (
          <>
            {/* Featured Products Carousel */}
            <ProductSection 
              title="Beliebte Werke" 
              products={featuredProducts} 
              showCarousel 
            />

            {/* Promo Banner - Photo Art */}
            <section className="py-12 md:py-20">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Foto-Kunst CTA */}
                  <div className="bg-primary p-8 md:p-12 flex flex-col justify-between min-h-[400px]">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary-foreground/70 mb-4">
                        Personalisiert
                      </p>
                      <h3 className="text-3xl md:text-4xl font-black uppercase text-primary-foreground mb-4">
                        Aus Foto<br />wird Kunst
                      </h3>
                      <p className="text-primary-foreground/80 max-w-sm">
                        Lade dein Lieblingsfoto hoch und unsere Künstler verwandeln es in ein einzigartiges Street-Art Werk.
                      </p>
                    </div>
                    <Button 
                      asChild
                      size="lg"
                      className="bg-background text-foreground hover:bg-background/90 uppercase font-bold text-sm tracking-wider h-14 px-8 self-start mt-8"
                    >
                      <Link to="/">
                        Jetzt gestalten
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  {/* Format Extension CTA */}
                  <div className="bg-foreground p-8 md:p-12 flex flex-col justify-between min-h-[400px]">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.3em] text-background/70 mb-4">
                        KI-erweitert
                      </p>
                      <h3 className="text-3xl md:text-4xl font-black uppercase text-background mb-4">
                        Aus quer<br />wird hoch
                      </h3>
                      <p className="text-background/80 max-w-sm">
                        Wir erweitern dein Foto mit KI für das perfekte Format – ohne dabei Details zu verlieren.
                      </p>
                    </div>
                    <Button 
                      asChild
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 uppercase font-bold text-sm tracking-wider h-14 px-8 self-start mt-8"
                    >
                      <Link to="/">
                        Mehr erfahren
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Top Seller Grid */}
            <ProductSection 
              title="Top Seller" 
              products={topSeller}
              accentColor="pink"
            />

            {/* New Arrivals */}
            <ProductSection 
              title="Neue Motive" 
              products={newArrivals}
              showCarousel
            />

            {/* Newsletter / Community Section */}
            <section className="py-20 bg-[hsl(50,100%,50%)]">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-black uppercase text-foreground mb-4">
                  Join the Movement
                </h2>
                <p className="text-foreground/80 mb-8 max-w-xl mx-auto">
                  Melde dich für unseren Newsletter an und erhalte 10% Rabatt auf deine erste Bestellung.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Deine E-Mail"
                    className="flex-1 h-14 px-6 bg-background text-foreground placeholder:text-muted-foreground border-2 border-foreground focus:outline-none focus:border-primary"
                  />
                  <Button 
                    size="lg"
                    className="bg-foreground text-background hover:bg-foreground/90 uppercase font-bold text-sm tracking-wider h-14 px-8"
                  >
                    Anmelden
                  </Button>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
