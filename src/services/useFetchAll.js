import { useState, useEffect, useRef } from "react";

export default function useFetchAll(urls) {
  const preUrlsRef = useRef([]); // Salvo gli url già renderizzati, così da evitare un successivo render inutile
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only run if the array of URLs passed in changes
    if (areEqual(preUrlsRef.current, urls)) {
      setLoading(false);
      return;
    };
    preUrlsRef.current = urls ;

    const promises = urls.map((url) =>
      fetch(process.env.REACT_APP_API_BASE_URL + url).then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
    );

    Promise.all(promises)
      .then((json) => setData(json))
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [urls]);

  return { data, loading, error };
}

// Le funzioni JS pure meglio metterle fuori dal Custom hook, così da non riallocarle ad ogni render, piccolo miglioramento delle performance
function areEqual(array1, array2){
  return (
    array1.length === array2.length &&
    array1.every((value, index) => value === array2[index])
  );
}
