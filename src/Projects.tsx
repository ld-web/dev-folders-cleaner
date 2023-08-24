import { Project } from "./types";
import ProjectItem from "./Project";

interface ProjectsProps {
  data: Project[];
}

const Projects = ({ data }: ProjectsProps) => (
  <div className="flex flex-wrap gap-4 justify-center mt-8">
    {data.map((project) => (
      <ProjectItem project={project} key={project.path} />
    ))}
  </div>
);

export default Projects;
