import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useZakekeToken } from '@/hooks/useZakekeToken';
import { useCartStore } from '@/stores/cartStore';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Declare the ZakekeDesigner type for TypeScript
declare global {
  interface Window {
    ZakekeDesigner: new () => {
      createIframe: (config: ZakekeConfig) => void;
      removeIframe: () => void;
    };
  }
}

interface ZakekeConfig {
  tokenOauth: string;
  container: string;
  culture?: string;
  getProductInfo: () => Promise<ProductInfo>;
  addToCart: (designDoc: string, preview: string, quantity: number) => Promise<void>;
  getProductPrice: (options: PriceOptions) => Promise<PriceResult>;
  onBackClicked?: () => void;
}

interface ProductInfo {
  modelCode: string;
  quantity: number;
  attributes?: Record<string, string>;
}

interface PriceOptions {
  modelCode: string;
  sides: Array<{ name: string; hasDesign: boolean }>;
  attributes?: Record<string, string>;
}

interface PriceResult {
  price: number;
  formattedPrice: string;
}

// The Zakeke model code for your product - this should match your Zakeke configuration
const ZAKEKE_MODEL_CODE = 'masterprodukt-individuelle-streetart';

const Konfigurator = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const customizerRef = useRef<InstanceType<typeof window.ZakekeDesigner> | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const { token, isLoading: isTokenLoading, error: tokenError } = useZakekeToken();
  const addItem = useCartStore(state => state.addItem);

  // Load Zakeke SDK script
  useEffect(() => {
    if (document.querySelector('script[src*="zakeke"]')) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://portal.zakeke.com/scripts/simpleintegration/zakekeDesigner.js';
    script.async = true;
    script.onload = () => {
      console.log('Zakeke SDK loaded');
      setIsScriptLoaded(true);
    };
    script.onerror = () => {
      console.error('Failed to load Zakeke SDK');
      toast.error('Failed to load customizer');
    };
    document.body.appendChild(script);

    return () => {
      // Don't remove script on unmount - it can be reused
    };
  }, []);

  // Initialize Zakeke customizer once token and script are ready
  useEffect(() => {
    if (!token || !isScriptLoaded || !containerRef.current || isInitialized) {
      return;
    }

    if (!window.ZakekeDesigner) {
      console.error('ZakekeDesigner not available');
      return;
    }

    console.log('Initializing Zakeke customizer...');

    const customizer = new window.ZakekeDesigner();
    customizerRef.current = customizer;

    const config: ZakekeConfig = {
      tokenOauth: token,
      container: 'zakeke-container',
      culture: 'de-DE',

      // Called by Zakeke to get product info
      getProductInfo: async () => {
        const modelCode = searchParams.get('model') || ZAKEKE_MODEL_CODE;
        console.log('Zakeke requesting product info for:', modelCode);
        return {
          modelCode,
          quantity: 1,
        };
      },

      // Called when user clicks "Add to Cart" in Zakeke
      addToCart: async (designDoc: string, preview: string, quantity: number) => {
        console.log('Zakeke addToCart called:', { designDoc, preview, quantity });
        
        try {
          // Store the Zakeke design data and redirect to checkout
          // Since Zakeke handles the product customization, we need to:
          // 1. Either add to Shopify cart via their integration
          // 2. Or store design and handle checkout ourselves
          
          toast.success('Design gespeichert! Weiterleitung zum Checkout...');
          
          // For now, redirect to Shopify with the design
          // Zakeke typically handles this via their Shopify integration
          const shopifyProductUrl = `https://urban-artery.myshopify.com/products/${ZAKEKE_MODEL_CODE}`;
          window.location.href = shopifyProductUrl;
          
        } catch (error) {
          console.error('Failed to add to cart:', error);
          toast.error('Fehler beim Hinzufügen zum Warenkorb');
        }
      },

      // Called by Zakeke to get dynamic pricing
      getProductPrice: async (options: PriceOptions) => {
        console.log('Zakeke requesting price for:', options);
        // Return base price - Zakeke will add customization costs
        return {
          price: 0, // Base price, Zakeke adds its own pricing
          formattedPrice: '€0,00',
        };
      },

      // Called when user clicks back
      onBackClicked: () => {
        console.log('Zakeke back clicked');
        navigate(-1);
      },
    };

    try {
      customizer.createIframe(config);
      setIsInitialized(true);
      console.log('Zakeke customizer initialized');
    } catch (error) {
      console.error('Failed to initialize Zakeke:', error);
      toast.error('Fehler beim Laden des Konfigurators');
    }

    return () => {
      if (customizerRef.current) {
        try {
          customizerRef.current.removeIframe();
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    };
  }, [token, isScriptLoaded, isInitialized, searchParams, navigate, addItem]);

  const isLoading = isTokenLoading || !isScriptLoaded;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex flex-col">
        {isLoading && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Konfigurator wird geladen...</p>
            </div>
          </div>
        )}

        {tokenError && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md px-4">
              <h2 className="text-xl font-bold mb-4">Konfigurator nicht verfügbar</h2>
              <p className="text-muted-foreground mb-6">
                Der Konfigurator kann momentan nicht geladen werden. 
                Bitte nutze die alternative Option auf unserer Shopify-Seite.
              </p>
              <a 
                href="https://urban-artery.myshopify.com/products/masterprodukt-individuelle-streetart"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
              >
                Zum Konfigurator auf Shopify
              </a>
            </div>
          </div>
        )}

        <div 
          id="zakeke-container" 
          ref={containerRef}
          className={`flex-1 w-full ${isLoading || tokenError ? 'hidden' : ''}`}
          style={{ minHeight: '70vh' }}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Konfigurator;
