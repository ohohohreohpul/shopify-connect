import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ZakekeToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export function useZakekeToken() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchToken() {
      try {
        setIsLoading(true);
        setError(null);

        const { data, error: fnError } = await supabase.functions.invoke<ZakekeToken>('zakeke-token');

        if (fnError) {
          throw new Error(fnError.message);
        }

        if (data?.access_token) {
          setToken(data.access_token);
        } else {
          throw new Error('No access token received');
        }
      } catch (err) {
        console.error('Failed to fetch Zakeke token:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch token');
      } finally {
        setIsLoading(false);
      }
    }

    fetchToken();
  }, []);

  return { token, isLoading, error };
}
