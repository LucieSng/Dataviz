import { useNavigate } from "react-router-dom";

export default function HeaderComponent() {
  const nav = useNavigate();
  const navigate = () => {
    nav("/Homepage");
  };
  return (
    <header className="navbar bg-blue-700">
      <div className="flex-1">
        <button
          onClick={navigate}
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl btn-ghost"
        >
          Accueil
        </button>
      </div>
      <div className="flex-1">
        <h1>Dataviz, vos données ciné à Paris</h1>
      </div>

      <div className="flex-none"></div>
    </header>
  );
}
