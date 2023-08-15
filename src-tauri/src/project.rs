use crate::utils;
use ignore::DirEntry;
use std::path::PathBuf;

#[derive(Debug, Clone, Copy, serde::Serialize)]
pub enum ProjectType {
    Composer,
    NPM,
}

#[derive(Debug, Clone, serde::Serialize)]
pub enum ProjectDirType {
    Dependencies,
    Build,
    Cache,
}

#[derive(Clone, Debug, serde::Serialize)]
pub struct Project {
    pub path: PathBuf,
    pub project_type: Vec<ProjectType>,
}

#[derive(Clone, Debug, serde::Serialize)]
pub struct ProjectDir {
    pub name: String,
    pub dir_type: ProjectDirType,
}

#[derive(Clone, Debug, serde::Serialize)]
pub struct ProjectVariant {
    pub name: String,
    pub dirs: Vec<ProjectDir>,
}

/// Analyse a directory and find out if it's a project or not
pub fn get_project(dir: DirEntry) -> Option<Project> {
    for file_name in utils::get_filenames(&dir)? {
        if let Some(project_type) = get_project_type(&file_name) {
            return Some(Project {
                path: dir.path().to_path_buf(),
                project_type: vec![project_type],
            });
        } else {
            continue;
        }
    }

    None
}

fn get_project_type(file_name: &str) -> Option<ProjectType> {
    match file_name {
        "composer.json" => Some(ProjectType::Composer),
        "package.json" => Some(ProjectType::NPM),
        _ => None,
    }
}
