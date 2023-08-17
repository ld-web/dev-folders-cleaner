import { ProjectBaseType, ProjectVariant } from "./types";

interface Badge {
  svg: string;
  logo: string;
  color?: string;
}

const badges = new Map<ProjectBaseType | ProjectVariant, Badge>();

badges
  .set(ProjectBaseType.NPM, {
    svg: "NPM-%23CB3837.svg",
    logo: "npm",
  })
  .set(ProjectBaseType.Composer, {
    svg: "php-%23777BB4.svg",
    logo: "php",
  })
  .set(ProjectVariant.NextJS, {
    svg: "Next-black",
    logo: "next.js",
  })
  .set(ProjectVariant.Symfony, {
    svg: "symfony-%23000000.svg",
    logo: "symfony",
  })
  .set(ProjectVariant.Angular, {
    svg: "angular-%23DD0031.svg",
    logo: "angular",
  })
  .set(ProjectVariant.Gatsby, {
    svg: "Gatsby-%23663399.svg",
    logo: "gatsby",
  });

export { badges };
