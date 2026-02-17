import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface PricingRule {
  id: string;
  category: string;
  option_key: string;
  price_eur: number;
  label: string | null;
  description: string | null;
  is_active: boolean;
  sort_order: number;
}

export function usePricingRules() {
  return useQuery({
    queryKey: ['pricing-rules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pricing_rules')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      if (error) throw error;
      return data as PricingRule[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function calculateTotalPrice(
  rules: PricingRule[],
  size: string,
  material: string,
  addons: string[]
): number {
  const ruleMap = new Map(rules.map(r => [`${r.category}:${r.option_key}`, r]));
  
  let total = 0;
  const baseRule = ruleMap.get(`base_size:${size}`);
  if (baseRule) total += Number(baseRule.price_eur);

  const matRule = ruleMap.get(`material:${material}`);
  if (matRule) total += Number(matRule.price_eur);

  for (const addon of addons) {
    const addonRule = ruleMap.get(`addon:${addon}`);
    if (addonRule) total += Number(addonRule.price_eur);
  }

  return total;
}
