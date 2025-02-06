import { useState } from 'react';
import axios from 'axios';

const useDelete = (url, options = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const deleteData = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(url, options);
      setResponse(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, response, loading, error };
};

export default useDelete;
