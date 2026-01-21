import { ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Link } from "react-router-dom";

interface ProductSectionProps {
  title: string;
  products: ShopifyProduct[];
  showCarousel?: boolean;
  accentColor?: 'pink' | 'default';
}

export const ProductSection = ({ 
  title, 
  products, 
  showCarousel = false,
  accentColor = 'default' 
}: ProductSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 320;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  if (products.length === 0) return null;

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div>
            <h2 className={`text-2xl md:text-4xl font-black uppercase tracking-tight ${
              accentColor === 'pink' ? 'text-primary' : 'text-foreground'
            }`}>
              {title}
            </h2>
            <div className={`h-1 w-16 mt-3 ${
              accentColor === 'pink' ? 'bg-primary' : 'bg-foreground'
            }`} />
          </div>
          
          <div className="flex items-center gap-2">
            {showCarousel && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll('left')}
                  className="h-10 w-10 border-2 border-foreground hover:bg-foreground hover:text-background"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll('right')}
                  className="h-10 w-10 border-2 border-foreground hover:bg-foreground hover:text-background"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}
            <Button 
              asChild
              variant="ghost" 
              className="hidden md:flex uppercase font-bold text-xs tracking-wider hover:text-primary"
            >
              <Link to="/">
                Alle ansehen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {showCarousel ? (
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
          >
            {products.map((product) => (
              <div key={product.node.id} className="flex-shrink-0 w-[260px] md:w-[300px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
