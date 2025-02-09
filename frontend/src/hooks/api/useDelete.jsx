import { useState } from 'react';
import axios from 'axios';

const useDelete = (url, options = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const deleteData = async (url, options) => {
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
const deleteData = async (url, options) => {
  
  try {
    const res = await axios.delete(url, options);
    console.log(res)
  } catch (err) {
     
  }
};
export {useDelete,deleteData};
