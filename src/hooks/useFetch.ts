import React from 'react';

const useFetch = <T>() => {
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const request = React.useCallback(
    async (url: URL | RequestInfo, options: RequestInit) => {
      let response;
      let json;
      try {
        setError(null);
        setLoading(true);

        response = await fetch(url, options);
        json = await response.json();

        if (!response.ok) throw new Error(json.message);
      } catch (error: any) {
        json = null;
        setError(error.message);
      } finally {
        setData(json);
        setLoading(false);
        return { response, json };
      }
    },
    []
  );

  return {
    data,
    loading,
    error,
    request,
  };
};

export default useFetch;
