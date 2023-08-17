import Icon from "./Icon";
import { Project } from "./types";

interface ProjectsProps {
  data: Project[];
}

const shorten = (path: string) => path.substring(path.lastIndexOf("/") + 1);

const Projects = ({ data }: ProjectsProps) => (
  <div className="flex flex-wrap gap-4 justify-center mt-8">
    {data.map((project) => (
      <div key={project.path} className="p-6 border-2 shadow w-[380px]">
        <div className="flex justify-between">
          <div>
            <Icon project_type={project.base_type} />
          </div>
          <div>
            {project.variants.map((variant) => (
              <Icon project_type={variant} key={project.path + variant} />
            ))}
          </div>
        </div>
        <h3 className="text-2xl break-words">{shorten(project.path)}</h3>
      </div>
    ))}
  </div>
);

export default Projects;
