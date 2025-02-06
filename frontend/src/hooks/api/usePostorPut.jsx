import { useState } from 'react';
import axios from 'axios';

const usePostOrPut = (url, method = 'post', options = {}) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendData = async (data) => {
    setLoading(true);
    try {
      const res = await axios({ url, method, data, ...options });
      setResponse(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { sendData, response, loading, error };
};

export default usePostOrPut;
