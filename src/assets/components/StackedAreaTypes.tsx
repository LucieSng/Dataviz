// Type de tournages au total par année
import { useEffect, useState } from "react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface AggregatedData {
  annee_tournage: string;
  type_tournage: string;
  "count(*)": number;
}

interface TransformedData {
  year: string;
  type: string;
  count: number;
}

export default function StackedAreaTypes({ isAnimationActive = false }) {
  const [apiData, setApiData] = useState<AggregatedData[] | undefined>(
    undefined
  );
  const [chartData, setChartData] = useState<TransformedData[] | undefined>(
    undefined
  );

  useEffect(() => {
    fetchDataStackedAreaTypes();
  }, []);

  async function fetchDataStackedAreaTypes() {
    const url =
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?select=annee_tournage%2Ctype_tournage%2Ccount(*)&group_by=annee_tournage%2Ctype_tournage";

    try {
      const response = await fetch(url);
      //   console.log("response log", response);

      const data = await response.json();
      //   console.log("data log", data);

      // Extract the results array from the API response
      const results = data.results;
      setApiData(results);
      //   console.log("apiData log", results);

      // Transform data to extract year and rename count field
      const transformed = results.map((item: AggregatedData) => ({
        year: new Date(item.annee_tournage).getFullYear().toString(),
        type: item.type_tournage.trim().toLowerCase(),
        // trim permet de supprimer les espaces en début et fin de chaîne, toLowerCase permet de mettre en
        count: item["count(*)"],
      }));
      setChartData(transformed);
      //   console.log("chartData log", transformed);

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {chartData && chartData.length > 0 && (
        <AreaChart
          style={{
            width: "100%",
            maxWidth: "700px",
            maxHeight: "70vh",
            aspectRatio: 1.618,
          }}
          responsive
          data={apiData}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorLongMetrage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorTelefilm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSerieTV" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#413ea0" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSerieWeb" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f5f5f5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="longmetrage"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorLongMetrage)"
            isAnimationActive={isAnimationActive}
          />
          <Area
            type="monotone"
            dataKey="telefilm"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorTelefilm)"
            isAnimationActive={isAnimationActive}
          />
          <Area
            type="monotone"
            dataKey="serietv"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorSerieTV)"
            isAnimationActive={isAnimationActive}
          />
          <Area
            type="monotone"
            dataKey="serieweb"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorSerieWeb)"
            isAnimationActive={isAnimationActive}
          />
        </AreaChart>
      )}
    </div>
  );
}
