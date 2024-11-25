import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import Projects from "./Projects";
import ExploreButton from "./ExploreButton";

function App() {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[] | null>(null);

  const explore = async () => {
    try {
      setProjects(null);
      setLoading(true);
      const fetchedProjects = (await invoke("get_home_projects")) as Project[];
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto px-4 py-8 bg-gray-800 min-h-screen">
      <header className="mb-8">
        <h1 className="text-center text-6xl font-bold mb-2 text-gray-100">
          DCleaner
        </h1>
        <h2 className="max-w-sm mx-auto text-center font-light text-slate-400">
          Clean your dependencies and cache folders
        </h2>
      </header>

      <div className="text-center mb-6">
        <ExploreButton loading={loading} explore={explore} />
      </div>

      <Projects data={projects} loading={loading} />
    </div>
  );
}

export default App;
