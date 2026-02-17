import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Upload, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { usePricingRules, calculateTotalPrice } from '@/hooks/usePricingRules';

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
  { value: 'LightBeton', label: 'LightBeton' },
  { value: 'Aquarellpapier', label: 'Aquarellpapier' },
  { value: 'Leinwand', label: 'Leinwand' },
];

const ADDON_OPTIONS = [
  { key: 'custom_text', hasInput: true },
  { key: 'premium_finish', hasInput: false },
  { key: 'gold_accents', hasInput: false },
  { key: 'extra_colors', hasInput: false },
];

const STEPS = [
  { number: 1, label: 'Konfigurieren' },
  { number: 2, label: 'Gestalten' },
  { number: 3, label: 'Bestellen' },
];

const Konfigurator = () => {
  const [size, setSize] = useState('M');
  const [orientation, setOrientation] = useState('Hochformat');
  const [material, setMaterial] = useState('LightBeton');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [customText, setCustomText] = useState('');
  const [designFile, setDesignFile] = useState<File | null>(null);
  const [designPreview, setDesignPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const { data: rules = [], isLoading: rulesLoading } = usePricingRules();

  const totalPrice = calculateTotalPrice(rules, size, material, selectedAddons);

  // Build addon info from rules
  const addonRules = rules.filter(r => r.category === 'addon');
  const materialRules = rules.filter(r => r.category === 'material');

  const getMaterialDescription = (key: string) => {
    const rule = materialRules.find(r => r.option_key === key);
    if (!rule) return '';
    return rule.description || '';
  };

  const getMaterialSurcharge = (key: string) => {
    const rule = materialRules.find(r => r.option_key === key);
    return rule ? Number(rule.price_eur) : 0;
  };

  const toggleAddon = (key: string) => {
    setSelectedAddons(prev =>
      prev.includes(key) ? prev.filter(a => a !== key) : [...prev, key]
    );
    if (key === 'custom_text' && selectedAddons.includes('custom_text')) {
      setCustomText('');
    }
  };

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) {
      toast.error('Datei zu groß', { description: 'Maximal 20 MB erlaubt.' });
      return;
    }
    setDesignFile(file);
    setDesignPreview(URL.createObjectURL(file));
    setActiveStep(2);
  }, []);

  const removeDesign = () => {
    setDesignFile(null);
    if (designPreview) URL.revokeObjectURL(designPreview);
    setDesignPreview(null);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      let designImageUrl: string | undefined;

      // Upload design if present
      if (designFile) {
        const ext = designFile.name.split('.').pop();
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('design-uploads')
          .upload(path, designFile);
        if (uploadError) throw new Error(`Upload fehlgeschlagen: ${uploadError.message}`);
        
        const { data: urlData } = supabase.storage
          .from('design-uploads')
          .getPublicUrl(path);
        designImageUrl = urlData.publicUrl;
      }

      // Call edge function
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/create-custom-order`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({
            size,
            orientation,
            material,
            addons: selectedAddons,
            customText: selectedAddons.includes('custom_text') ? customText : undefined,
            designImageUrl,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Bestellung fehlgeschlagen');
      }

      // Redirect to Shopify checkout
      window.open(data.checkoutUrl, '_blank');
      toast.success('Bestellung erstellt!', { description: 'Du wirst zum Checkout weitergeleitet.' });
      setActiveStep(3);
    } catch (err: any) {
      console.error('Order error:', err);
      toast.error('Fehler', { description: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedSize = SIZES.find(s => s.value === size);

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
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors ${
                    activeStep >= step.number 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-background/20 text-sm font-bold">
                      {activeStep > step.number ? <Check className="w-4 h-4" /> : step.number}
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
                  {designPreview ? (
                    <>
                      <img src={designPreview} alt="Dein Design" className="w-full h-full object-cover" />
                      <button onClick={removeDesign} className="absolute top-3 right-3 p-1.5 bg-background/80 rounded-full hover:bg-background">
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <label className="absolute inset-0 flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                      <div className="text-center p-8">
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                          <Upload className="w-10 h-10 text-primary/60" />
                        </div>
                        <p className="text-muted-foreground text-sm font-medium">
                          Klicke hier, um dein Design hochzuladen
                        </p>
                        <p className="text-muted-foreground/60 text-xs mt-1">JPG, PNG, PDF – max. 20 MB</p>
                      </div>
                      <input type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileChange} />
                    </label>
                  )}
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
                    {SIZES.map((s) => {
                      const baseRule = rules.find(r => r.category === 'base_size' && r.option_key === s.value);
                      return (
                        <button
                          key={s.value}
                          onClick={() => setSize(s.value)}
                          className={`relative p-4 rounded-lg border-2 transition-all ${
                            size === s.value
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {size === s.value && <Check className="absolute top-2 right-2 w-4 h-4 text-primary" />}
                          <div className="text-2xl font-bold">{s.label}</div>
                          <div className="text-xs text-muted-foreground mt-1">{s.dimensions}</div>
                          {baseRule && (
                            <div className="text-xs font-semibold text-primary mt-1">
                              €{Number(baseRule.price_eur).toFixed(0)}
                            </div>
                          )}
                        </button>
                      );
                    })}
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
                        {orientation === o.value && <Check className="absolute top-2 right-2 w-4 h-4 text-primary" />}
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
                    {MATERIALS.map((m) => {
                      const surcharge = getMaterialSurcharge(m.value);
                      return (
                        <button
                          key={m.value}
                          onClick={() => setMaterial(m.value)}
                          className={`relative w-full p-4 rounded-lg border-2 transition-all text-left ${
                            material === m.value
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {material === m.value && <Check className="absolute top-4 right-4 w-5 h-5 text-primary" />}
                          <div className="font-bold">{m.label}</div>
                          <div className="text-sm text-muted-foreground">
                            {getMaterialDescription(m.value)}
                            {surcharge > 0 && <span className="ml-2 text-primary font-medium">+€{surcharge.toFixed(0)}</span>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Add-ons */}
                <div>
                  <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">Extras</h3>
                  <div className="space-y-3">
                    {ADDON_OPTIONS.map((addon) => {
                      const rule = addonRules.find(r => r.option_key === addon.key);
                      if (!rule) return null;
                      const isSelected = selectedAddons.includes(addon.key);
                      return (
                        <div key={addon.key} className={`p-4 rounded-lg border-2 transition-all ${
                          isSelected ? 'border-primary bg-primary/5' : 'border-border'
                        }`}>
                          <div className="flex items-center gap-3">
                            <Checkbox
                              id={addon.key}
                              checked={isSelected}
                              onCheckedChange={() => toggleAddon(addon.key)}
                            />
                            <Label htmlFor={addon.key} className="flex-1 cursor-pointer">
                              <span className="font-bold">{rule.label}</span>
                              <span className="text-sm text-muted-foreground ml-2">
                                +€{Number(rule.price_eur).toFixed(0)}
                              </span>
                              {rule.description && (
                                <p className="text-xs text-muted-foreground mt-0.5">{rule.description}</p>
                              )}
                            </Label>
                          </div>
                          {addon.hasInput && isSelected && (
                            <Input
                              className="mt-3"
                              placeholder="Dein Text..."
                              value={customText}
                              onChange={(e) => setCustomText(e.target.value)}
                              maxLength={100}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="pt-6 border-t border-border">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-muted-foreground">Gesamtpreis</span>
                    <span className="text-3xl font-black">
                      {rulesLoading ? '...' : `€${totalPrice.toFixed(0)}`}
                    </span>
                  </div>
                  <Button 
                    onClick={handleSubmit}
                    size="lg"
                    className="w-full text-lg font-bold uppercase tracking-wider py-6"
                    disabled={isSubmitting || rulesLoading}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                        Wird erstellt...
                      </>
                    ) : (
                      <>
                        Jetzt bestellen
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Du wirst zum Shopify Checkout weitergeleitet
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
