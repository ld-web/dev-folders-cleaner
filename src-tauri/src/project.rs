mod composer;
mod npm;
use crate::utils;
use erased_serde::serialize_trait_object;
use ignore::DirEntry;
use std::path::PathBuf;

use self::{composer::Composer, npm::Npm};

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

pub trait Project: erased_serde::Serialize {
    fn get_folders() -> Vec<ProjectDir>
    where
        Self: Sized;
    fn get_variants() -> Option<Vec<ProjectVariant>>
    where
        Self: Sized;
    fn get_infos(&self) -> &ProjectInfos;
}

serialize_trait_object!(Project);

#[derive(Clone, Debug, serde::Serialize)]
pub struct ProjectInfos {
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
pub fn get_project(dir: DirEntry) -> Option<Box<dyn Project>> {
    for file_name in utils::get_filenames(&dir)? {
        if let Some(project_type) = get_project_type(&file_name) {
            let infos = ProjectInfos {
                path: dir.path().to_path_buf(),
                project_type: vec![project_type],
            };
            let project: Box<dyn Project> = match project_type {
                ProjectType::Composer => Box::new(Composer { infos }),
                ProjectType::NPM => Box::new(Npm { infos }),
            };
            return Some(project);
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
