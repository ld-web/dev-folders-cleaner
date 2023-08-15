pub mod project;
mod utils;

use project::{get_project, Project};

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error(transparent)]
    Io(#[from] std::io::Error),
}

impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

pub fn list_projects(folder_path: &str) -> Result<Vec<Box<dyn Project>>, Error> {
    let walker = ignore::WalkBuilder::new(folder_path)
        .require_git(false)
        .build();

    let projects: Vec<_> = walker
        .filter_map(|e| e.ok())
        .filter(|e| e.path().is_dir())
        .filter_map(get_project)
        .collect();

    Ok(projects)
}
