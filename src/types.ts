export enum ProjectBaseType {
  Cargo = "Cargo",
  Composer = "Composer",
  NPM = "NPM",
}

export enum ProjectVariant {
  // Composer
  Symfony = "Symfony",
  // NPM
  NextJS = "NextJS",
  Docusaurus = "Docusaurus",
  Angular = "Angular",
  Gatsby = "Gatsby",
}

export type Project = {
  base_type: ProjectBaseType;
  path: string;
  variants?: ProjectVariant[];
  size: number;
};
