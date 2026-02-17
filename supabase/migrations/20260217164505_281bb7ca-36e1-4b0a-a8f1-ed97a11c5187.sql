
-- Pricing rules table for dynamic configurator pricing
CREATE TABLE public.pricing_rules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  option_key TEXT NOT NULL,
  price_eur NUMERIC(10,2) NOT NULL DEFAULT 0,
  label TEXT,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(category, option_key)
);

-- RLS: publicly readable (prices are public), no public writes
ALTER TABLE public.pricing_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pricing rules are publicly readable"
  ON public.pricing_rules FOR SELECT
  USING (true);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_pricing_rules_updated_at
  BEFORE UPDATE ON public.pricing_rules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for customer design uploads (public so images can be referenced in orders)
INSERT INTO storage.buckets (id, name, public) VALUES ('design-uploads', 'design-uploads', true);

-- Anyone can upload to design-uploads (no auth required for customer uploads)
CREATE POLICY "Anyone can upload designs"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'design-uploads');

CREATE POLICY "Design uploads are publicly readable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'design-uploads');

-- Seed initial pricing rules
INSERT INTO public.pricing_rules (category, option_key, price_eur, label, description, sort_order) VALUES
  -- Base sizes
  ('base_size', 'S', 89.00, 'S – 20×30 cm', 'Kleine Größe', 1),
  ('base_size', 'M', 149.00, 'M – 40×60 cm', 'Mittlere Größe', 2),
  ('base_size', 'L', 249.00, 'L – 80×120 cm', 'Große Größe', 3),
  ('base_size', 'XL', 399.00, 'XL – 120×180 cm', 'Extra große Größe', 4),
  -- Materials (surcharges)
  ('material', 'LightBeton', 0.00, 'LightBeton', 'Robuste Betonoptik – inklusive', 1),
  ('material', 'Aquarellpapier', 15.00, 'Aquarellpapier', 'Feine Papierstruktur', 2),
  ('material', 'Leinwand', 25.00, 'Leinwand', 'Klassischer Canvas-Look', 3),
  -- Add-ons
  ('addon', 'custom_text', 19.00, 'Individueller Text', 'Eigenen Text hinzufügen', 1),
  ('addon', 'premium_finish', 29.00, 'Premium Finish', 'Hochglanz-Veredelung', 2),
  ('addon', 'gold_accents', 39.00, 'Gold-Akzente', 'Goldene Highlights', 3),
  ('addon', 'extra_colors', 15.00, 'Extra Farben', 'Erweiterte Farbpalette', 4);
