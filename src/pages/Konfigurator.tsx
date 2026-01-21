import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

// Variant mapping based on Shopify product data
// Format: `${size}-${orientation}-${material}` -> variantId
const VARIANT_MAP: Record<string, string> = {
  // S - Hochformat
  'S-Hochformat-LightBeton': '44498697363723',
  'S-Hochformat-Aquarellpapier': '44498697396491',
  'S-Hochformat-Leinwand': '44498697429259',
  // S - Querformat
  'S-Querformat-LightBeton': '44498697462027',
  'S-Querformat-Aquarellpapier': '44498697494795',
  'S-Querformat-Leinwand': '44498697527563',
  // M - Hochformat
  'M-Hochformat-LightBeton': '44498697560331',
  'M-Hochformat-Aquarellpapier': '44498697593099',
  'M-Hochformat-Leinwand': '44498697625867',
  // M - Querformat
  'M-Querformat-LightBeton': '44498697658635',
  'M-Querformat-Aquarellpapier': '44498697691403',
  'M-Querformat-Leinwand': '44498697724171',
  // L - Hochformat
  'L-Hochformat-LightBeton': '44498697756939',
  'L-Hochformat-Aquarellpapier': '44498697789707',
  'L-Hochformat-Leinwand': '44498697822475',
  // L - Querformat
  'L-Querformat-LightBeton': '44498697855243',
  'L-Querformat-Aquarellpapier': '44498697888011',
  'L-Querformat-Leinwand': '44498697920779',
  // XL - Hochformat
  'XL-Hochformat-LightBeton': '44498697953547',
  'XL-Hochformat-Aquarellpapier': '44498697986315',
  'XL-Hochformat-Leinwand': '44498698019083',
  // XL - Querformat
  'XL-Querformat-LightBeton': '44498698051851',
  'XL-Querformat-Aquarellpapier': '44498698084619',
  'XL-Querformat-Leinwand': '44498698117387',
};

// Price mapping (in EUR)
const PRICE_MAP: Record<string, number> = {
  'S-Hochformat-LightBeton': 0,
  'S-Hochformat-Aquarellpapier': 0,
  'S-Hochformat-Leinwand': 0,
  'S-Querformat-LightBeton': 0,
  'S-Querformat-Aquarellpapier': 0,
  'S-Querformat-Leinwand': 0,
  'M-Hochformat-LightBeton': 200,
  'M-Hochformat-Aquarellpapier': 200,
  'M-Hochformat-Leinwand': 200,
  'M-Querformat-LightBeton': 200,
  'M-Querformat-Aquarellpapier': 200,
  'M-Querformat-Leinwand': 200,
  'L-Hochformat-LightBeton': 400,
  'L-Hochformat-Aquarellpapier': 400,
  'L-Hochformat-Leinwand': 400,
  'L-Querformat-LightBeton': 400,
  'L-Querformat-Aquarellpapier': 400,
  'L-Querformat-Leinwand': 400,
  'XL-Hochformat-LightBeton': 800,
  'XL-Hochformat-Aquarellpapier': 800,
  'XL-Hochformat-Leinwand': 800,
  'XL-Querformat-LightBeton': 800,
  'XL-Querformat-Aquarellpapier': 800,
  'XL-Querformat-Leinwand': 800,
};

const SIZES = [
  { value: 'S', label: 'S', dimensions: '20 × 30 cm' },
  { value: 'M', label: 'M', dimensions: '40 × 60 cm' },
  { value: 'L', label: 'L', dimensions: '80 × 120 cm' },
  { value: 'XL', label: 'XL', dimensions: '120 × 180 cm' },
];

const ORIENTATIONS = [
  { value: 'Hochformat', label: 'Hochformat', icon: '▯' },
  { value: 'Querformat', label: 'Querformat', icon: '▭' },
];

const MATERIALS = [
  { value: 'LightBeton', label: 'LightBeton', description: 'Robuste Betonoptik' },
  { value: 'Aquarellpapier', label: 'Aquarellpapier', description: 'Feine Papierstruktur' },
  { value: 'Leinwand', label: 'Leinwand', description: 'Klassischer Canvas-Look' },
];

const STEPS = [
  { number: 1, label: 'Konfigurieren', active: true },
  { number: 2, label: 'Gestalten', active: false },
  { number: 3, label: 'Bestellen', active: false },
];

const Konfigurator = () => {
  const [size, setSize] = useState('M');
  const [orientation, setOrientation] = useState('Hochformat');
  const [material, setMaterial] = useState('LightBeton');

  const variantKey = `${size}-${orientation}-${material}`;
  const variantId = VARIANT_MAP[variantKey];
  const price = PRICE_MAP[variantKey] || 0;

  const selectedSize = SIZES.find(s => s.value === size);

  const shopifyUrl = useMemo(() => {
    return `https://urban-artery.myshopify.com/products/masterprodukt-individuelle-streetart?variant=${variantId}`;
  }, [variantId]);

  const handleStartDesign = () => {
    window.location.href = shopifyUrl;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
                Dein Street-Art-Unikat
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Wähle deine Wunschkonfiguration und gestalte dein individuelles Kunstwerk
              </p>
            </motion.div>

            {/* Progress Steps */}
            <div className="flex justify-center items-center gap-2 md:gap-4 mb-12">
              {STEPS.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-full ${
                    step.active 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-background/20 text-sm font-bold">
                      {step.number}
                    </span>
                    <span className="hidden md:inline text-sm font-medium">{step.label}</span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <ArrowRight className="w-4 h-4 mx-2 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Configuration Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
              
              {/* Preview */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className={`relative bg-muted rounded-lg overflow-hidden ${
                  orientation === 'Hochformat' ? 'aspect-[3/4]' : 'aspect-[4/3]'
                } transition-all duration-300`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-4xl">🎨</span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Dein Design erscheint hier
                      </p>
                    </div>
                  </div>
                  {/* Material texture overlay */}
                  <div className={`absolute inset-0 opacity-20 pointer-events-none ${
                    material === 'LightBeton' ? 'bg-gradient-to-br from-stone-400 to-stone-600' :
                    material === 'Aquarellpapier' ? 'bg-gradient-to-br from-amber-100 to-amber-200' :
                    'bg-gradient-to-br from-neutral-200 to-neutral-400'
                  }`} />
                </div>
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  {selectedSize?.dimensions} • {orientation} • {material}
                </div>
              </motion.div>

              {/* Options */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-8"
              >
                {/* Size Selection */}
                <div>
                  <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">Größe</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {SIZES.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => setSize(s.value)}
                        className={`relative p-4 rounded-lg border-2 transition-all ${
                          size === s.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {size === s.value && (
                          <Check className="absolute top-2 right-2 w-4 h-4 text-primary" />
                        )}
                        <div className="text-2xl font-bold">{s.label}</div>
                        <div className="text-xs text-muted-foreground mt-1">{s.dimensions}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Orientation Selection */}
                <div>
                  <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">Format</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {ORIENTATIONS.map((o) => (
                      <button
                        key={o.value}
                        onClick={() => setOrientation(o.value)}
                        className={`relative p-4 rounded-lg border-2 transition-all ${
                          orientation === o.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {orientation === o.value && (
                          <Check className="absolute top-2 right-2 w-4 h-4 text-primary" />
                        )}
                        <div className="text-3xl mb-2">{o.icon}</div>
                        <div className="font-medium">{o.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Material Selection */}
                <div>
                  <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">Material</h3>
                  <div className="space-y-3">
                    {MATERIALS.map((m) => (
                      <button
                        key={m.value}
                        onClick={() => setMaterial(m.value)}
                        className={`relative w-full p-4 rounded-lg border-2 transition-all text-left ${
                          material === m.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {material === m.value && (
                          <Check className="absolute top-4 right-4 w-5 h-5 text-primary" />
                        )}
                        <div className="font-bold">{m.label}</div>
                        <div className="text-sm text-muted-foreground">{m.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="pt-6 border-t border-border">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-muted-foreground">Startpreis</span>
                    <span className="text-3xl font-black">
                      {price === 0 ? 'Kostenlos' : `€${price.toLocaleString('de-DE')}`}
                    </span>
                  </div>
                  <Button 
                    onClick={handleStartDesign}
                    size="lg"
                    className="w-full text-lg font-bold uppercase tracking-wider py-6"
                  >
                    Jetzt gestalten
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Du wirst zu unserem Konfigurator weitergeleitet
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Konfigurator;
