import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Loader2 } from "lucide-react";

const Inspiration = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(64);
        // Filter to show artist works (Künstlermotiv type products)
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Fehler beim Laden');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 bg-foreground text-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl mb-6">Inspiration</h1>
            <p className="text-lg md:text-xl text-background/80 max-w-2xl mx-auto">
              Entdecke unsere Künstlerwerke und lass dich für dein eigenes Unikat inspirieren.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-20 text-destructive">
                <p className="text-lg font-bold uppercase">{error}</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl font-bold uppercase text-foreground">Keine Produkte gefunden</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="text-muted-foreground">
                    {products.length} Werke gefunden
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                  {products.map((product) => (
                    <ProductCard key={product.node.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-4xl mb-4">
              Dein eigenes Kunstwerk gestalten?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Nutze unseren Konfigurator und erstelle dein individuelles Street-Art Unikat.
            </p>
            <a 
              href="https://urban-artery.com/products/masterprodukt-individuelle-streetart"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-14 px-8 bg-foreground text-background hover:bg-foreground/90 uppercase font-bold text-sm tracking-wider font-stencil transition-colors"
            >
              Zum Konfigurator
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Inspiration;
