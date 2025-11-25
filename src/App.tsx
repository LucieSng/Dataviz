// import { useEffect, useState } from "react";
import useParisApi from "./assets/components/services/parisApi";
import LineChartYear from "assets/components/types/LineChartYear";

import "./App.css";

function App() {
  const { apiData } = useParisApi();

  return (
    <>
      <div>
        <div>{JSON.stringify(apiData)}</div>
      </div>
      <div className="lineCharter"></div>
    </>
  );
}

export default App;
