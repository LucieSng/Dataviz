// code pris ctrl C/V sur le site de recharts

import { BarChart, Bar } from "recharts";
import { useParisApi } from "../components/hooks/useParisApi";

const BarChartType = ({ isAnimationActive = false }) => {
  // On définit une URL spécifique pour ce graphique qui récupère les tournages groupés par année
  const apiUrl =
    "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?select=annee_tournage,count(*)&group_by=annee_tournage&limit=100";
  const { apiData } = useParisApi(apiUrl);

  // Message pour le chargement des données
  if (!apiData?.results) {
    return <div>Chargement des données...</div>;
  }

  // #endregion
  const BarChart = () => {
    return (
      <BarChart
        style={{
          width: "100%",
          maxWidth: "300px",
          maxHeight: "100px",
          aspectRatio: 1.618,
          isAnimationActive: { isAnimationActive },
        }}
        responsive
        data={apiData}
      >
        <Bar dataKey="uv" fill="#8884d8" />
      </BarChart>
    );
  };
};

export default BarChartType;
