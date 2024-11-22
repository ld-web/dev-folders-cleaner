import byteSize from "byte-size";
import Icon from "./Icon";
import { Project } from "./types";
import Clean from "./Clean";
import { useState } from "react";
import Check from "./Check";
import Cancel from "./Cancel";
import { invoke } from "@tauri-apps/api/tauri";

interface ProjectProps {
  project: Project;
}

const shorten = (path: string) => path.substring(path.lastIndexOf("/") + 1);

const ProjectItem = ({ project }: ProjectProps) => {
  const [confirm, setConfirm] = useState(false);
  const [isCleaned, setIsCleaned] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const clean = async (project: Project) => {
    const bytes_cleaned = (await invoke("clean_project", {
      project,
    })) as number;
    console.log("bytes_cleaned", bytes_cleaned);
    setConfirm(false);
    setIsCleaned(true);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000); // Hide success message after 3 seconds
  };

  return (
    <div className="relative group">
      {/* Success Message */}
      {showSuccess && (
        <div className="absolute -top-12 left-0 right-0 flex justify-center">
          <div className="bg-emerald-500/90 text-white px-4 py-2 rounded-lg text-sm font-medium 
                         shadow-lg animate-fade-in-down">
            Project cleaned successfully!
          </div>
        </div>
      )}
      
      <div className={`p-6 rounded-2xl bg-gray-900/50 backdrop-blur-sm border 
                    hover:bg-gray-900/70 transition-all duration-300 w-[380px]
                    shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]
                    ${isCleaned ? 'border-emerald-500/30' : 'border-gray-700/50'}`}>
        {/* Cleaned Indicator */}
        {isCleaned && (
          <div className="absolute -right-2 -top-2 bg-emerald-500 rounded-full p-1.5 
                         shadow-[0_0_10px_rgba(16,185,129,0.5)]">
            <Check className="w-3 h-3 text-white" />
          </div>
        )}
        
        <div className="space-y-6">
          {/* Enhanced Header Section for dark theme */}
          <div className="space-y-4">
            {/* Project Name with glowing accent */}
            <div className="relative">
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-12 
                            bg-gradient-to-b from-indigo-400 to-indigo-600 rounded-full
                            shadow-[0_0_15px_rgba(129,140,248,0.5)]" />
              <h3 className="pl-2">
                <span className="block text-xl font-semibold text-gray-100 leading-tight">
                  {shorten(project.path)}
                </span>
                <span className="block text-sm font-medium text-gray-400 mt-1 truncate hover:text-clip group-hover:whitespace-normal transition-all duration-300" 
                      title={project.path}>
                  {project.path}
                </span>
              </h3>
            </div>

            {/* Stats and Icons Row */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2 p-2 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <Icon project_type={project.base_type} />
                {project.variants?.map((variant) => (
                  <Icon project_type={variant} key={project.path + variant} />
                ))}
              </div>
              <div className="text-sm bg-indigo-500/20 border border-indigo-500/30 
                            px-3.5 py-1.5 rounded-full text-indigo-300 font-medium
                            shadow-[0_0_10px_rgba(129,140,248,0.2)]">
                {`${byteSize(project.size)}`}
              </div>
            </div>
          </div>

          {/* Action Buttons for dark theme */}
          <div className="flex justify-end items-center">
            {confirm ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300 font-medium">
                  Confirm clean?
                </span>
                <button
                  className="p-2 rounded-full text-emerald-300 hover:text-white
                            bg-emerald-500/10 hover:bg-emerald-500 
                            border border-emerald-500/30 hover:border-emerald-500
                            transition-all duration-200"
                  onClick={() => clean(project)}
                >
                  <Check />
                </button>
                <button
                  className="p-2 rounded-full text-rose-300 hover:text-white
                            bg-rose-500/10 hover:bg-rose-500
                            border border-rose-500/30 hover:border-rose-500
                            transition-all duration-200"
                  onClick={() => setConfirm(false)}
                >
                  <Cancel />
                </button>
              </div>
            ) : (
              <button
                className="p-2.5 rounded-full text-gray-300 hover:text-white
                          bg-gray-700/50 hover:bg-rose-500/20 
                          border border-gray-600 hover:border-rose-500/30
                          transition-all duration-200
                          focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:ring-offset-2
                          focus:ring-offset-gray-800"
                onClick={() => setConfirm(true)}
              >
                <Clean />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
