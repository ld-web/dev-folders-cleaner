import byteSize from "byte-size";
import Icon from "./Icon";
import { Project } from "./types";

interface ProjectProps {
  project: Project;
}

const shorten = (path: string) => path.substring(path.lastIndexOf("/") + 1);

const ProjectItem = ({ project }: ProjectProps) => (
  <div className="p-6 border-[1px] border-gray-400 shadow w-[380px]">
    <div className="flex justify-between items-center mb-3">
      <div className="flex gap-1">
        <Icon project_type={project.base_type} />
        {project.variants?.map((variant) => (
          <Icon project_type={variant} key={project.path + variant} />
        ))}
      </div>
      <div className="text-sm bg-indigo-700 px-2 py-1 text-white">{`${byteSize(
        project.size
      )}`}</div>
    </div>
    <h3 className="text-xl break-words">{shorten(project.path)}</h3>
  </div>
);

export default ProjectItem;
