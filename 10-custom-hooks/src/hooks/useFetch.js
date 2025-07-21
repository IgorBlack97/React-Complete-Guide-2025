import { useEffect, useState } from "react";

export default function useFetch(fetchFn) {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const data = await fetchFn();

        setFetchedData(data);
        setIsFetching(false);
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places, please try again later.",
        });
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);

  return {
    isFetching,
    fetchedData,
    setFetchedData,
    error,
  };
}
