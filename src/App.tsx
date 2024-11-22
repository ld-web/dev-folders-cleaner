import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import Projects from "./Projects";
import { Project } from "./types";

function App() {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[] | null>(null);

  const explore = async () => {
    try {
      setProjects(null);
      setLoading(true);
      const fetchedProjects = await invoke("get_home_projects") as Project[];
      setProjects(fetchedProjects);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto px-4 py-8 bg-gray-800">
      <header className="mb-8">
        <h1 className="text-center text-6xl font-bold mb-2 text-gray-100">DCleaner</h1>
        <h2 className="max-w-sm mx-auto text-center font-light text-slate-400">
          Clean your dependencies and cache folders
        </h2>
      </header>
      
      <div className="text-center mb-6">
        <button
          onClick={explore}
          className="relative bg-gradient-to-r from-sky-800 to-sky-700 px-8 py-4 text-white rounded-lg
            hover:translate-y-[-1px] hover:shadow-lg active:translate-y-[1px]
            transition-all duration-200 ease-in-out
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Exploring...
            </span>
          ) : (
            'Explore home directory'
          )}
        </button>
      </div>

      <Projects data={projects} loading={loading} />
    </div>
  );
}

export default App;
