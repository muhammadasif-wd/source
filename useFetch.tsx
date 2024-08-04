Extend the useFetch hook to accept method and body parameters.
Use useState to manage the data, loading, and error states.
Use useEffect to fetch data when the component mounts or the URL, method, or body changes.
Handle different HTTP methods (GET, POST, PATCH, DELETE).
Return the data, loading, and error states from the hook.



// useFetch.ts
import { useState, useEffect } from 'react';

type FetchMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface FetchOptions {
  method?: FetchMethod;
  body?: any;
}

const useFetch = (url: string, options: FetchOptions = {}) => {
  const { method = 'GET', body } = options;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: body ? JSON.stringify(body) : null,
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]);

  return { data, loading, error };
};

export default useFetch;




// GetComponent.tsx
import React from 'react';
import useFetch from './useFetch';

const GetComponent = () => {
  const { data, loading, error } = useFetch('/api/endpoint');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default GetComponent;



// PostComponent.tsx
import React from 'react';
import useFetch from './useFetch';

const PostComponent = () => {
  const { data, loading, error } = useFetch('/api/endpoint', {
    method: 'POST',
    body: { key: 'value' },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Response:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default PostComponent;




// PatchComponent.tsx
import React from 'react';
import useFetch from './useFetch';

const PatchComponent = () => {
  const { data, loading, error } = useFetch('/api/endpoint', {
    method: 'PATCH',
    body: { key: 'newValue' },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Response:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default PatchComponent;




// DeleteComponent.tsx
import React from 'react';
import useFetch from './useFetch';

const DeleteComponent = () => {
  const { data, loading, error } = useFetch('/api/endpoint', {
    method: 'DELETE',
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Response:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DeleteComponent;
