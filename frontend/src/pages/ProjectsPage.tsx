import LogoutButton from "../components/ui/LogoutButton";

export default function ProjectsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <LogoutButton />
      </div>

      <h2 className="text-xl font-bold">Lista de proyectos</h2>
    </div>
  );
}
