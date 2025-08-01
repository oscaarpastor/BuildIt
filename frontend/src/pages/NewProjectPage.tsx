import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type Template = {
  _id: string;
  name: string;
};

export default function NewProjectPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(
    null
  );
  const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch(`${API_URL}/api/base-templates`);
        const data = await res.json();
        setTemplates(data);
      } catch (err) {
        console.error("Error al cargar plantillas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const createProject = async (templateId: string) => {
    try {
      const res = await fetch(
        `${API_URL}/api/projects/from-template`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            templateId,
            userId: user?._id,
            name: `Proyecto nuevo`,
          }),
        }
      );

      const project = await res.json();
      navigate(`/projects/${project._id}/edit`);
    } catch (err) {
      console.error("Error creando proyecto:", err);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/projects")}
        className="mb-4 text-sm text-primary border border-primary px-4 py-2 rounded hover:bg-primary/10 transition"
      >
        ← Volver
      </button>

      <h1 className="text-2xl font-bold mb-6">Selecciona una plantilla</h1>

      {loading ? (
        <p className="text-gray-500">Cargando plantillas...</p>
      ) : templates.length === 0 ? (
        <p className="text-gray-500">No hay plantillas disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <div
              key={tpl._id}
              className="border rounded-2xl shadow p-4 flex flex-col"
            >
              {/* Preview embebida al principio del card */}
              <div className="overflow-hidden rounded-lg mb-4 relative h-[200px] bg-white">
                {loading && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg z-10" />
                )}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[166.66%] h-[400px] scale-[0.6] origin-top pointer-events-none">
                  <iframe
                    src={`${API_URL}/api/base-templates/${tpl._id}/preview?preview=true`}
                    className={`w-full h-full border-0 rounded-lg transition-opacity duration-500 ${
                      loading ? "opacity-0" : "opacity-100"
                    }`}
                    title={`Preview de ${tpl.name}`}
                    loading="lazy"
                    onLoad={() => setLoading(false)}
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4">{tpl.name}</h3>

              <div className="flex flex-col gap-2 mt-auto">
                <button
                  onClick={() => setPreviewTemplateId(tpl._id)}
                  className="bg-white border border-primary text-primary px-4 py-2 rounded hover:bg-primary/10"
                >
                  Ver plantilla
                </button>
                <button
                  onClick={() => createProject(tpl._id)}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                >
                  Usar plantilla
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de previsualización */}
      {previewTemplateId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative w-[90%] h-[90%] bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src={`${API_URL}/api/base-templates/${previewTemplateId}/preview?preview=true`}
              className="w-full h-full border-0"
              title="Vista previa plantilla"
            />
            <button
              onClick={() => setPreviewTemplateId(null)}
              className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded shadow hover:bg-gray-100"
            >
              ✕ Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
