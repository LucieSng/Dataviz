import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import type { TooltipContentProps } from "recharts";

interface topDirectorDataTypes {
  nom_realisateur: "string";
  "count(*)": number;
}
interface transformedTopDirectorDataTypes {
  director: "string";
  count: number;
}

export default function TopDirectorBarChart({ isAnimationActive = false }) {
  const [apiData, setApiData] = useState<topDirectorDataTypes[] | undefined>(
    undefined
  );
  const [chartData, setChartData] = useState<
    transformedTopDirectorDataTypes[] | undefined
  >(undefined);

  useEffect(() => {
    fetchDataTopDirector();
  }, []);

  async function fetchDataTopDirector() {
    const url =
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?select=nom_realisateur,count(*)&where=nom_realisateur%20is%20not%20null&group_by=realisateur&order_by=count(*)%20DESC&limit=10";

    try {
      const response = await fetch(url);
      const data = await response.json();
      const results = data.results;
      setApiData(results);

      const transformed = results.map((item: topDirectorDataTypes) => ({
        director: item.nom_realisateur,
        count: item["count(*)"],
      }));
      setChartData(transformed);
    } catch (error) {
      console.error("Error");
    }
  }

  const CustomTooltip = ({
    active,
    payload,
  }: TooltipContentProps<string | number, string>) => {
    const isVisible = active && payload && payload.length;
    return (
      <div
        className="custom-tooltip"
        style={{ visibility: isVisible ? "visible" : "hidden" }}
      >
        {isVisible && (
          <>
            <p className="label text-black bg-white p-1 rounded-xl">
              {` Realisateur : ${payload[0].value}`}{" "}
            </p>
          </>
        )}
      </div>
    );
  };

  return (
    <div>
      {chartData && chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="director" />
            <YAxis width="auto" dataKey="count" />
            <Tooltip content={CustomTooltip} />
            <Legend />
            <Bar
              dataKey="count"
              fill="#8884d8"
              name="Top 10 des Réalisateurs"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
              isAnimationActive={isAnimationActive}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
