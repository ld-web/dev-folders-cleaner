import byteSize from "byte-size";
import Icon from "./Icon";
import { Project } from "./types";
import Clean from "./Clean";

interface ProjectProps {
  project: Project;
}

const shorten = (path: string) => path.substring(path.lastIndexOf("/") + 1);

const ProjectItem = ({ project }: ProjectProps) => (
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
      <button className="text-white bg-red-600 p-2 rounded-full hover:bg-red-800">
        <Clean />
      </button>
    </div>
  </div>
);

export default ProjectItem;
