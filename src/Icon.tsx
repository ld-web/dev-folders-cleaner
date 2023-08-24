import { badges } from "./badges";
import { ProjectBaseType, ProjectVariant } from "./types";

const Icon = ({
  project_type,
}: {
  project_type: ProjectBaseType | ProjectVariant;
}) => {
  const badge = badges.get(project_type);

  if (badge === undefined) {
    return (
      <span className="p-1 bg-slate-700 text-white text-xs">
        {project_type}
      </span>
    );
  }

  return (
    <img
      src={`https://img.shields.io/badge/${badge.svg}?style=flat-square&logo=${
        badge.logo
      }&logoColor=${badge.color ?? "white"}`}
      alt={project_type}
    />
  );
};

export default Icon;
