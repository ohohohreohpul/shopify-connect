import { ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

interface ProductSectionProps {
  title: string;
  products: ShopifyProduct[];
  showCarousel?: boolean;
}

export const ProductSection = ({ title, products, showCarousel = false }: ProductSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 280;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  if (products.length === 0) return null;

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">{title}</h2>
          {showCarousel && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scroll('left')}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scroll('right')}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {showCarousel ? (
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <div key={product.node.id} className="flex-shrink-0 w-[140px] md:w-[200px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
