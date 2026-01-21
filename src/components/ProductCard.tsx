import { Link } from "react-router-dom";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const { node } = product;
  const image = node.images?.edges?.[0]?.node;
  const price = node.priceRange?.minVariantPrice;
  const variant = node.variants?.edges?.[0]?.node;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    });
    
    toast.success("Zum Warenkorb hinzugefügt", {
      description: node.title,
    });
  };

  const shopifyUrl = "https://urban-artery.com/products/masterprodukt-individuelle-streetart";

  return (
    <a 
      href={shopifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="relative overflow-hidden bg-muted aspect-[3/4]">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || node.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Kein Bild
          </div>
        )}
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
        
        {/* Quick add button */}
        <Button
          onClick={handleAddToCart}
          disabled={isLoading || !variant}
          size="icon"
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-primary hover:bg-primary/90 h-12 w-12"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Plus className="h-5 w-5" />
          )}
        </Button>
        
        {/* Price tag */}
        {price && (
          <div className="absolute top-4 left-4 bg-background px-3 py-1">
            <span className="text-sm font-bold text-foreground font-stencil">
              ab {parseFloat(price.amount).toFixed(0)}€
            </span>
          </div>
        )}
      </div>
      
      {/* Product info */}
      <div className="mt-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-foreground line-clamp-1 group-hover:text-primary transition-colors font-stencil">
          {node.title}
        </h3>
      </div>
    </a>
  );
};
