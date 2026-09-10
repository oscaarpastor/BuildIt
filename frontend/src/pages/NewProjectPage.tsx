import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { TEMPLATES } from "../data/templates";

export default function NewProjectPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null);
  const [creating, setCreating] = useState<string | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const createProject = async (templateId: string) => {
    setCreating(templateId);
    const tpl = TEMPLATES.find((t) => t.id === templateId);
    if (!tpl) return;
    try {
      const res = await fetch(`${API_URL}/api/projects/from-template`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId,
          userId: user?._id,
          name: tpl.name,
        }),
      });
      const project = await res.json();
      navigate(`/projects/${project._id}/edit`);
    } catch (err) {
      console.error("Error creando proyecto:", err);
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map((tpl) => (
          <div
            key={tpl.id}
            className="border rounded-2xl shadow-sm hover:shadow-lg transition-shadow p-4 flex flex-col bg-white"
          >
            <div
              className="rounded-xl mb-4 relative h-[200px] overflow-hidden flex flex-col items-center justify-center p-6 text-white"
              style={{ background: tpl.gradient }}
            >
              <span className="text-5xl mb-3">{tpl.icon}</span>
              <span className="font-bold text-lg text-center drop-shadow">{tpl.name}</span>
              <div className="mt-3 flex gap-1">
                <span className="w-3 h-3 rounded-full bg-white/40" />
                <span className="w-3 h-3 rounded-full bg-white/30" />
                <span className="w-3 h-3 rounded-full bg-white/20" />
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-1">{tpl.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{tpl.description}</p>

            <div className="flex flex-col gap-2 mt-auto">
              <button
                onClick={() => setPreviewTemplateId(tpl.id)}
                className="bg-white border border-primary text-primary px-4 py-2 rounded hover:bg-primary/10 text-sm font-medium"
              >
                Ver plantilla
              </button>
              <button
                onClick={() => createProject(tpl.id)}
                disabled={creating === tpl.id}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 text-sm font-medium disabled:opacity-50"
              >
                {creating === tpl.id ? "Creando..." : "Usar plantilla"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {previewTemplateId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="h-full overflow-y-auto p-8">
              {(() => {
                const tpl = TEMPLATES.find((t) => t.id === previewTemplateId);
                if (!tpl) return null;
                const c = tpl.config;
                return (
                  <div style={{ fontFamily: c.theme.fontFamily }}>
                    <div className="rounded-xl p-10 text-white text-center mb-8" style={{ background: tpl.gradient }}>
                      <span className="text-6xl block mb-4">{tpl.icon}</span>
                      <h2 className="text-3xl font-bold mb-2">{c.hero.title}</h2>
                      <p className="text-white/80">{c.hero.subtitle}</p>
                      <span className="inline-block mt-4 bg-white/20 px-6 py-2 rounded-full font-semibold">{c.hero.ctaText}</span>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-3">{c.about.heading}</h3>
                      <p className="text-gray-600">{c.about.content}</p>
                    </div>

                    {c.features.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4">Caracteristicas</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {c.features.map((f, i) => (
                            <div key={i} className="bg-gray-50 rounded-xl p-4 text-center">
                              <span className="text-3xl block mb-2">{f.icon}</span>
                              <h4 className="font-bold">{f.title}</h4>
                              <p className="text-sm text-gray-600">{f.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {c.products.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4">Productos / Precios</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {c.products.map((p, i) => (
                            <div key={i} className="border rounded-xl p-4 text-center">
                              <h4 className="font-bold">{p.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{p.description}</p>
                              <span className="text-lg font-bold" style={{ color: c.theme.colorPrimary }}>{p.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {c.testimonials.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4">Testimonios</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {c.testimonials.map((t, i) => (
                            <div key={i} className="bg-gray-50 rounded-xl p-4 text-center">
                              <p className="italic text-gray-600 mb-2">"{t.quote}"</p>
                              <p className="font-bold text-sm">{t.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
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
