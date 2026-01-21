import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { IntroSection } from "@/components/IntroSection";
import { ProductSection } from "@/components/ProductSection";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { VideoSection } from "@/components/VideoSection";
import { StorySection } from "@/components/StorySection";
import { FeatureCardsSection } from "@/components/FeatureCardsSection";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
      <IntroSection />
      
      <main>
        {error ? (
          <div className="text-center py-32 text-destructive">
            <p className="text-lg font-bold uppercase">{error}</p>
          </div>
        ) : !loading && products.length === 0 ? (
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
              isLoading={loading}
            />

            {/* Urban Artery Video */}
            <VideoSection />

            {/* Before/After Comparison Widgets */}
            <BeforeAfterSection />

            {/* Top Seller Grid */}
            <ProductSection 
              title="Top Seller" 
              products={topSeller}
              accentColor="pink"
              isLoading={loading}
            />

            {/* New Arrivals */}
            <ProductSection 
              title="Neue Motive" 
              products={newArrivals}
              showCarousel
              isLoading={loading}
            />

            {/* Story & Auftragsarbeiten Section */}
            <StorySection />

            {/* Feature Cards Section - Diesel Style */}
            <FeatureCardsSection />

            {/* Newsletter / Community Section */}
            <section className="py-20 bg-foreground">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-5xl text-background mb-4">
                  Join the Movement
                </h2>
                <p className="text-background/80 mb-8 max-w-xl mx-auto">
                  Melde dich für unseren Newsletter an und erhalte 10% Rabatt auf deine erste Bestellung.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Deine E-Mail"
                    className="flex-1 h-14 px-6 bg-background text-foreground placeholder:text-muted-foreground border-2 border-background focus:outline-none focus:border-primary"
                  />
                  <Button 
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 uppercase font-bold text-sm tracking-wider h-14 px-8 font-stencil"
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
      <ScrollToTop />
    </div>
  );
};

export default Index;
