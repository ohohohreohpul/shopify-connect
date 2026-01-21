import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductSection } from "@/components/ProductSection";
import { Footer } from "@/components/Footer";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Loader2 } from "lucide-react";

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

  const beliebteWerke = products.slice(0, 8);
  const topSeller = products.slice(8, 12);
  const neueMotive = products.slice(12, 24);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      <main>
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-destructive">
            <p>{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">Keine Produkte gefunden</p>
            <p className="text-sm text-muted-foreground mt-2">
              Erstelle dein erstes Produkt, indem du mir sagst, was du verkaufen möchtest.
            </p>
          </div>
        ) : (
          <>
            <ProductSection 
              title="Beliebte Werke" 
              products={beliebteWerke} 
              showCarousel 
            />

            {/* Promo Sections */}
            <section className="py-8 md:py-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative overflow-hidden rounded-sm bg-secondary/30 aspect-[4/5] flex items-center justify-center">
                    <div className="text-center p-6">
                      <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                        Aus Foto wird Kunst
                      </h3>
                      <p className="text-muted-foreground">
                        Lade dein Foto hoch und wir machen Kunst daraus
                      </p>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-sm bg-secondary/30 aspect-[4/5] flex items-center justify-center">
                    <div className="text-center p-6">
                      <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                        Aus quer wird hoch
                      </h3>
                      <p className="text-muted-foreground">
                        Wir erweitern dein Foto für das perfekte Format
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <ProductSection 
              title="Top Seller" 
              products={topSeller} 
            />

            <ProductSection 
              title="Neue Motive" 
              products={neueMotive} 
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
