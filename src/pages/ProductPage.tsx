import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { fetchProductByHandle, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, ShoppingCart, Check } from "lucide-react";
import { toast } from "sonner";

const ProductPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      try {
        const data = await fetchProductByHandle(handle);
        setProduct(data);
        if (data?.variants?.edges?.[0]) {
          setSelectedVariant(data.variants.edges[0].node.id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [handle]);

  const handleAddToCart = async () => {
    if (!product || !selectedVariant) return;
    
    const variant = product.variants.edges.find(v => v.node.id === selectedVariant)?.node;
    if (!variant) return;

    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    });

    toast.success("Zum Warenkorb hinzugefügt", {
      description: product.title,
      icon: <Check className="h-4 w-4" />,
    });
  };

  const currentVariant = product?.variants?.edges?.find(v => v.node.id === selectedVariant)?.node;
  const images = product?.images?.edges || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Zurück
        </Link>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : !product ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Produkt nicht gefunden</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-secondary/30 rounded-sm overflow-hidden">
                {images[selectedImage]?.node && (
                  <img
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`flex-shrink-0 w-16 h-20 rounded-sm overflow-hidden border-2 transition-colors ${
                        selectedImage === i ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={img.node.url}
                        alt={img.node.altText || `${product.title} ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                  {product.title}
                </h1>
                {currentVariant && (
                  <p className="text-2xl font-bold text-foreground">
                    {parseFloat(currentVariant.price.amount).toFixed(2)} €
                  </p>
                )}
              </div>

              {/* Variants */}
              {product.options && product.options.length > 0 && product.options[0].values.length > 1 && (
                <div className="space-y-4">
                  {product.options.map((option) => (
                    <div key={option.name}>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {option.name}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => {
                          const matchingVariant = product.variants.edges.find(v =>
                            v.node.selectedOptions.some(so => so.name === option.name && so.value === value)
                          );
                          const isSelected = matchingVariant?.node.id === selectedVariant;
                          
                          return (
                            <button
                              key={value}
                              onClick={() => matchingVariant && setSelectedVariant(matchingVariant.node.id)}
                              className={`px-4 py-2 text-sm border rounded-sm transition-colors ${
                                isSelected
                                  ? 'border-primary bg-primary text-primary-foreground'
                                  : 'border-border hover:border-primary'
                              }`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Button
                onClick={handleAddToCart}
                disabled={isCartLoading || !currentVariant?.availableForSale}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90"
              >
                {isCartLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    In den Warenkorb
                  </>
                )}
              </Button>

              {product.description && (
                <div className="pt-6 border-t border-border">
                  <h2 className="text-lg font-medium text-foreground mb-3">Beschreibung</h2>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
