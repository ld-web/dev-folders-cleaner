import { ProjectBaseType, ProjectVariant } from "./types";

const Icon = ({
  project_type,
}: {
  project_type: ProjectBaseType | ProjectVariant;
}) => {
  switch (project_type) {
    case ProjectBaseType.NPM:
      return (
        <img
          src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=flat-square&logo=npm&logoColor=white"
          alt="NPM"
        />
      );
    case ProjectBaseType.Composer:
      return (
        <img
          src="https://img.shields.io/badge/php-%23777BB4.svg?style=flat-square&logo=php&logoColor=white"
          alt="NPM"
        />
      );
    case ProjectVariant.NextJS:
      return (
        <img
          src="https://img.shields.io/badge/Next-black?style=flat-square&logo=next.js&logoColor=white"
          alt="NextJS"
        />
      );
    case ProjectVariant.Symfony:
      return (
        <img
          src="https://img.shields.io/badge/symfony-%23000000.svg?style=flat-square&logo=symfony&logoColor=white"
          alt="NextJS"
        />
      );
    case ProjectVariant.Angular:
      return (
        <img
          src="https://img.shields.io/badge/angular-%23DD0031.svg?style=flat-square&logo=angular&logoColor=white"
          alt="NextJS"
        />
      );
    case ProjectVariant.Gatsby:
      return (
        <img
          src="https://img.shields.io/badge/Gatsby-%23663399.svg?style=flat-square&logo=gatsby&logoColor=white"
          alt="NextJS"
        />
      );
    default:
      return <span>{project_type}</span>;
  }
};

export default Icon;
