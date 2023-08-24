import byteSize from "byte-size";
import Icon from "./Icon";
import { Project } from "./types";

interface ProjectsProps {
  data: Project[];
}

const shorten = (path: string) => path.substring(path.lastIndexOf("/") + 1);

const Projects = ({ data }: ProjectsProps) => (
  <div className="flex flex-wrap gap-4 justify-center mt-8">
    {data.map((project) => (
      <div
        key={project.path}
        className="p-6 border-[1px] border-gray-400 shadow w-[380px]"
      >
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
    ))}
  </div>
);

export default Projects;
