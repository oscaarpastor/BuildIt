import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { siteUrl } from "../../../lib/api";

export default function ProjectPublicViewPage() {
  const { id: publicId = "" } = useParams();
  const { t } = useTranslation();

  return (
    <iframe
      src={siteUrl(publicId)}
      style={{ width: "100vw", height: "100vh", border: "none", margin: 0, padding: 0, display: "block" }}
      title={t("publicView.title")}
    />
  );
}
