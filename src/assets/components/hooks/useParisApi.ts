// On importe les outils de React :
// - useState : pour stocker une valeur qui peut changer
// - useEffect : pour exécuter du code automatiquement au chargement du hook
import { useEffect, useState } from "react";

// On customise le hook avec "use" devant et on lui ajoute un paramètre "url" pour le rendre réutilisable. Chaque composant pourra passer son URL spécifique.
export default function useParisApi(url: string) {
  // apiData : contient les données récupérées depuis l'API
  // setApiData : sert à modifier ces données. Au début,pas encore de valeur (undefined)
  const [apiData, setApiData] = useState();

  // useEffect permet de lancer du code automatiquement
  // Le tableau [] indique que l’effet doit être exécuté : une seule fois, au chargement et jamais plus ensuite.
  // si pas de [], useEffect se relance à chaque changement de state et comme "fetchApi()" change "apiData" via "setApiData"(qui utilise un state), ça lance une boucle infinie.
  useEffect(() => {
    fetchApi();
  }, [url]); // On dépend maintenant de "url" et plus d'un tableau vide

  // Cette fonction va appeler l'API et récupérer les données
  const fetchApi = async () => {
    try {
      const response = await fetch(url); // On utilise l'url en paramètre, elle passe en dynamique au lieu de l'url en dur

      const data = await response.json();

      // On stocke les données récupérées dans setApiData
      setApiData(data);

      console.log(data);
    } catch (error) {
      //si qqch ne fonctionne pas, on affiche une erreur dans la console
      console.error("something went wrong. Not able to fetch the data.");
    }
    return;
  };

  // Le hook renvoie apiData qui est utilisé dans le fichier APP.tsx
  return { apiData };
}
