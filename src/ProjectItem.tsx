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

  const clean = async (project: Project) => {
    const bytes_cleaned = (await invoke("clean_project", {
      project,
    })) as number;
    console.log("bytes_cleaned", bytes_cleaned);
    setConfirm(false);
  };

  return (
    <div className="p-4 border-[1px] border-gray-400 shadow w-[380px] flex flex-col justify-between">
      <div className="flex justify-between items-start gap-x-3">
        <h3 className="text-xl break-words max-w-[260px]">
          {shorten(project.path)}
        </h3>
        <div className="text-sm bg-indigo-700 px-2 py-1 text-white whitespace-nowrap inline">{`${byteSize(
          project.size
        )}`}</div>
      </div>
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-1">
          <Icon project_type={project.base_type} />
          {project.variants?.map((variant) => (
            <Icon project_type={variant} key={project.path + variant} />
          ))}
        </div>
      </div>
      <div className="flex justify-end items-end">
        {confirm && (
          <div>
            <span className="mr-4">Sure ?</span>
            <button
              className="text-white bg-green-600 p-2 rounded-full hover:bg-green-800 mr-2"
              onClick={() => clean(project)}
            >
              <Check />
            </button>
            <button
              className="text-white bg-red-600 p-2 rounded-full hover:bg-red-800"
              onClick={() => setConfirm(false)}
            >
              <Cancel />
            </button>
          </div>
        )}

        {!confirm && (
          <button
            className="text-white bg-red-600 p-2 rounded-full hover:bg-red-800"
            onClick={() => setConfirm(true)}
          >
            <Clean />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectItem;
