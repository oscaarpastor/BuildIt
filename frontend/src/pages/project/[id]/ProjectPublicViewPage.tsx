import { useParams } from "react-router-dom";

export default function PublicStandaloneView() {
  const { id } = useParams();

  return (
    <iframe
      src={`http://localhost:3000/api/projects/${id}/preview`}
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
