// On importe le hook qui va récupérer les données de l'API

import LineChartYear from "./assets/components/LineChartYear";
import StackedAreaTypes from "./assets/components/StackedAreaTypes";
import HeaderComponent from "./assets/components/header";
import "./App.css";

function App() {
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <LineChartYear />
      <StackedAreaTypes />
    </>
  );
}

export default App;
