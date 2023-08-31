use crate::utils::{dir_size, get_content, ContentType};
use ignore::DirEntry;
use std::{fs, path::PathBuf};

#[derive(Debug, Clone, Copy, serde::Serialize, serde::Deserialize)]
pub enum ProjectBaseType {
    Cargo,
    Composer,
    NPM,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub enum ProjectVariant {
    // Composer
    Symfony,
    // NPM
    NextJS,
    Docusaurus,
    Angular,
    Gatsby,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct Project {
    pub path: PathBuf,
    pub base_type: ProjectBaseType,
    pub variants: Option<Vec<ProjectVariant>>,
    pub size: u64,
}

/// Analyse a directory and find out if it's a project or not
pub fn get_project(dir: DirEntry) -> Option<Project> {
    for file_name in get_content(&dir, ContentType::Files)? {
        if let Some(project_base_type) = get_project_base_type(&file_name) {
            return Some(Project {
                path: dir.path().to_path_buf(),
                base_type: project_base_type,
                variants: get_variants(&dir, project_base_type),
                size: dir_size(&dir),
            });
        } else {
            continue;
        }
    }

    None
}

/// Given a file name, see if we can guess a kind of project
fn get_project_base_type(file_name: &str) -> Option<ProjectBaseType> {
    match file_name {
        "composer.json" => Some(ProjectBaseType::Composer),
        "package.json" => Some(ProjectBaseType::NPM),
        "Cargo.toml" => Some(ProjectBaseType::Cargo),
        _ => None,
    }
}

fn get_variants(dir: &DirEntry, base_type: ProjectBaseType) -> Option<Vec<ProjectVariant>> {
    let content = get_content(dir, ContentType::All)?;

    match base_type {
        ProjectBaseType::Composer => get_composer_variants(content),
        ProjectBaseType::NPM => get_npm_variants(content),
        _ => None,
    }
}

fn get_composer_variants(content: impl Iterator<Item = String>) -> Option<Vec<ProjectVariant>> {
    let mut variants = vec![];

    for file_name in content {
        if file_name.eq("symfony.lock") {
            variants.push(ProjectVariant::Symfony);
        }
    }

    Some(variants)
}

fn get_npm_variants(content: impl Iterator<Item = String>) -> Option<Vec<ProjectVariant>> {
    let mut variants = vec![];

    for file_name in content {
        if file_name.starts_with("next.config.") {
            variants.push(ProjectVariant::NextJS);
        }
        if file_name.starts_with("docusaurus.config.") {
            variants.push(ProjectVariant::Docusaurus);
        }
        if file_name.eq("angular.json") {
            variants.push(ProjectVariant::Angular);
        }
        if file_name.starts_with("gatsby-config.") {
            variants.push(ProjectVariant::Gatsby);
        }
    }

    Some(variants)
}

pub fn clean_project(project: Project) -> u64 {
    let dirs = match project.base_type {
        ProjectBaseType::Cargo => ["target"],
        ProjectBaseType::Composer => ["vendor"],
        ProjectBaseType::NPM => ["node_modules"],
    };

    for artifact_dir in dirs
        .iter()
        .copied()
        .map(|ad| project.path.join(ad))
        .filter(|ad| ad.exists())
    {
        if let Err(e) = fs::remove_dir_all(&artifact_dir) {
            eprintln!("error removing directory {:?}: {:?}", artifact_dir, e);
        }
    }
    0
}
