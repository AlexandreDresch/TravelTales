import { useState, useEffect } from "react";

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: any;
  act: (...args: any[]) => Promise<T | void>;
}

export default function useAsync<T>(
  handler: (...args: any[]) => Promise<T>,
  immediate = true
): AsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<any>(null);

  const act = async (...args: any[]): Promise<T | void> => {
    setLoading(true);
    setError(null);

    try {
      const data = await handler(...args);
      setData(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  useEffect(() => {
    if (immediate) {
      act();
    }
  }, [act, immediate]);

  return {
    data,
    loading,
    error,
    act,
  };
}
