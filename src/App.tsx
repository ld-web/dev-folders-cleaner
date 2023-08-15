import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);

  async function explore() {
    setLoading(true);
    console.log(await invoke("get_home_projects"));
    setLoading(false);
  }

  return (
    <div className="px-2 py-6">
      <h1 className="text-center text-6xl font-bold">DCleaner</h1>
      <h2 className="max-w-sm text-center font-light text-slate-500 m-auto">
        Clean your dependencies and cache folders
      </h2>
      <button
        onClick={explore}
        className="bg-sky-800 p-4 text-white disabled:opacity-20"
        disabled={loading}
      >
        Explore home directory
      </button>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default App;
