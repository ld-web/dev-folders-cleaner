import ProjectItem from "./ProjectItem";
import ProjectSkeleton from "./ProjectSkeleton";

interface ProjectsProps {
  data: Project[] | null;
  loading: boolean;
}

const Projects = ({ data, loading }: ProjectsProps) => (
  <div className="flex flex-wrap gap-4 justify-center mt-8">
    {loading &&
      Array.from({ length: 5 }).map((_s, idx) => <ProjectSkeleton key={idx} />)}
    {data &&
      data.map((project) => (
        <ProjectItem project={project} key={project.path} />
      ))}
  </div>
);

export default Projects;
