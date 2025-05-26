import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { PreviewCard } from "../components/PreviewCard";

type Project = {
  _id: string;
  name: string;
  createdAt: string;
};

export default function ProjectsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (!user?._id) return;
        const res = await fetch(`http://localhost:3000/api/projects/user/${user._id}`);
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, [user]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          {t("projects.greeting", { name: user?.name || "usuario" })}
        </h2>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/projects/new")}
            className="text-sm font-semibold text-white bg-primary px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-200 shadow"
          >
            + {t("projects.create_button")}
          </button>

          <button
            onClick={() => navigate("/settings")}
            className="text-sm font-semibold text-primary border border-primary px-4 py-2 rounded-lg bg-white hover:bg-primary/10 shadow-sm transition-all duration-200"
          >
            ⚙ {t("projects.settings_button")}
          </button>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-3">{t("projects.your_projects")}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <PreviewCard
            key={project._id}
            id={project._id}
            name={project.name}
            createdAt={project.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
