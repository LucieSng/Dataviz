import { useEffect, useState } from "react";

export default function parisApi() {
  const apiUrl =
    "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=20";

  const [apiData, setApiData] = useState();

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setApiData(data);
      console.log(data);
    } catch (error) {
      console.error("something went wrong. Not able to fetch the data.");
    }
    return;
  };
  return { apiData };
}
