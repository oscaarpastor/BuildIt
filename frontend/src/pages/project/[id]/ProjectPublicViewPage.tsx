import { useParams } from "react-router-dom";

export default function PublicStandaloneView() {
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;


  return (
    <iframe
      src={`${API_URL}/api/projects/${id}/preview`}
      style={{
        width: "100vw",
        height: "100vh",
        border: "none",
        margin: 0,
        padding: 0,
        display: "block",
      }}
      title="Vista completa del sitio"
    />
  );
}
