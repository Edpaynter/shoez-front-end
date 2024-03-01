import { useState, useEffect } from "react";
import axios from "axios";
// import { API_KEY_TEMP } from "@env"
let apiKey = 'API_KEY_TEMP';
export const useFetch = (endpoint, method, file) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options: any = {
    method: method,
    header: {
      "Content-Type": "multipart/form-data",
    },
    url: `${endpoint}`,
    data: { file }
    // params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      // alert("There is an error in request");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData()
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };

};
