use crate::utils::{get_content, ContentType};
use ignore::DirEntry;
use std::path::PathBuf;

#[derive(Debug, Clone, Copy, serde::Serialize)]
pub enum ProjectBaseType {
    Cargo,
    Composer,
    NPM,
}

#[derive(Debug, serde::Serialize)]
pub enum ProjectVariant {
    Symfony,
    NextJS,
    Docusaurus,
}

#[derive(Debug, serde::Serialize)]
pub struct Project {
    pub path: PathBuf,
    pub base_type: ProjectBaseType,
    pub variants: Option<Vec<ProjectVariant>>,
}

/// Analyse a directory and find out if it's a project or not
pub fn get_project(dir: DirEntry) -> Option<Project> {
    for file_name in get_content(&dir, ContentType::Files)? {
        if let Some(project_base_type) = get_project_base_type(&file_name) {
            return Some(Project {
                path: dir.path().to_path_buf(),
                base_type: project_base_type,
                variants: search_variants(&dir, project_base_type),
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
        _ => None,
    }
}

fn search_variants(dir: &DirEntry, base_type: ProjectBaseType) -> Option<Vec<ProjectVariant>> {
    let content = get_content(dir, ContentType::All)?;

    match base_type {
        ProjectBaseType::Composer => search_composer_variants(content),
        ProjectBaseType::NPM => search_npm_variants(content),
        _ => None,
    }
}

fn search_composer_variants(content: impl Iterator<Item = String>) -> Option<Vec<ProjectVariant>> {
    let mut variants = vec![];

    for file_name in content {
        if file_name.eq("symfony.lock") {
            variants.push(ProjectVariant::Symfony);
        }
    }

    Some(variants)
}

fn search_npm_variants(content: impl Iterator<Item = String>) -> Option<Vec<ProjectVariant>> {
    let mut variants = vec![];

    for file_name in content {
        if file_name.eq("next.config.js") {
            variants.push(ProjectVariant::NextJS);
        }
        if file_name.eq("docusaurus.config.js") {
            variants.push(ProjectVariant::Docusaurus);
        }
    }

    Some(variants)
}
