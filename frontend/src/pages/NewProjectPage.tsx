import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type BaseTemplate = {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
  gradient?: string;
};

export default function NewProjectPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<BaseTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null);
  const [creating, setCreating] = useState<string | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch(`${API_URL}/api/base-templates`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setTemplates(await res.json());
      } catch (err) {
        console.error("Error cargando plantillas:", err);
        setError("No se pudieron cargar las plantillas.");
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, [API_URL]);

  const createProject = async (tpl: BaseTemplate) => {
    setCreating(tpl._id);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/projects/from-template`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: tpl._id,
          userId: user?._id,
          name: tpl.name,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const project = await res.json();
      navigate(`/projects/${project._id}/edit`);
    } catch (err) {
      console.error("Error creando proyecto:", err);
      setError("No se pudo crear el proyecto. Inténtalo de nuevo.");
      setCreating(null);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/projects")}
        className="mb-4 text-sm text-primary border border-primary px-4 py-2 rounded hover:bg-primary/10 transition"
      >
        &larr; Volver
      </button>

      <h1 className="text-2xl font-bold mb-2">Selecciona una plantilla</h1>
      <p className="text-gray-500 mb-6">Elige un diseno profesional para empezar tu proyecto.</p>

      {error && (
        <p role="alert" className="mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-4 py-2">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-gray-500">Cargando plantillas...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <div
              key={tpl._id}
              className="border rounded-2xl shadow-sm hover:shadow-lg transition-shadow p-4 flex flex-col bg-white"
            >
              <div
                className="rounded-xl mb-4 relative h-[200px] overflow-hidden flex flex-col items-center justify-center p-6 text-white bg-gray-400"
                style={tpl.gradient ? { background: tpl.gradient } : undefined}
              >
                <span className="text-5xl mb-3">{tpl.icon}</span>
                <span className="font-bold text-lg text-center drop-shadow">{tpl.name}</span>
              </div>

              <h3 className="text-lg font-semibold mb-1">{tpl.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{tpl.description}</p>

              <div className="flex flex-col gap-2 mt-auto">
                <button
                  onClick={() => setPreviewTemplateId(tpl._id)}
                  className="bg-white border border-primary text-primary px-4 py-2 rounded hover:bg-primary/10 text-sm font-medium"
                >
                  Ver plantilla
                </button>
                <button
                  onClick={() => createProject(tpl)}
                  disabled={creating !== null}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 text-sm font-medium disabled:opacity-50"
                >
                  {creating === tpl._id ? "Creando..." : "Usar plantilla"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {previewTemplateId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-5xl h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
            <iframe
              src={`${API_URL}/api/base-templates/${previewTemplateId}/preview`}
              className="w-full h-full border-0"
              title="Vista previa de la plantilla"
            />
            <button
              onClick={() => setPreviewTemplateId(null)}
              className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-lg shadow hover:bg-gray-100 font-medium"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
