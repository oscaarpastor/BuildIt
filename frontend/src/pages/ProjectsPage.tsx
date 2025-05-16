import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

export default function ProjectsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">
            {t("projects.greeting", { name: user?.name || "usuario" })}
          </h2>
        </div>

        <button
          onClick={() => navigate("/settings")}
          className="text-sm font-semibold text-primary border border-primary px-4 py-2 rounded-lg bg-white hover:bg-primary/10 shadow-sm transition-all duration-200"
        >
          ⚙ {t("projects.settings_button")}
        </button>
      </div>
    </div>
  );
}
