import { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { AutoTablaComponentAgenda } from "./AutoTablaComponentAgenda.jsx";

export const GetAllComponentAgenda = ({ endpoint }) => {
  const { data, fetchData, isLoading, error } = useFetch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await fetchData(`http://localhost:3000${endpoint}`, "GET");
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };
    fetchUserData();
  }, [endpoint]); 

  return (
    <>
      {isLoading ? (
        <p className="loading">Cargando...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : data && data.length > 0 ? (
        <AutoTablaComponentAgenda data={data} />
      ) : (
        <p>No hay datos disponibles.</p>
      )}
    </>
  );
};
