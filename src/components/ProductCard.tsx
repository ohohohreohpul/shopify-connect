import { Link } from "react-router-dom";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
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

  return (
    <Link 
      to={`/product/${node.handle}`} 
      className="group block"
    >
      <div className="relative overflow-hidden bg-secondary/30 aspect-[3/4] mb-3">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || node.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Kein Bild
          </div>
        )}
        <Button
          onClick={handleAddToCart}
          disabled={isLoading || !variant}
          size="sm"
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-primary hover:bg-primary/90"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ShoppingCart className="h-4 w-4" />
          )}
        </Button>
      </div>
      <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-1">
        {node.title}
      </h3>
      {price && (
        <p className="text-sm text-muted-foreground">
          ab {parseFloat(price.amount).toFixed(2)} €
        </p>
      )}
    </Link>
  );
};
