use crate::project::ProjectDirType;

use super::{Project, ProjectDir, ProjectInfos, ProjectVariant};

#[derive(Debug, Clone, serde::Serialize)]
pub struct Npm {
    pub infos: ProjectInfos,
}

impl Project for Npm {
    fn get_folders() -> Vec<ProjectDir> {
        vec![ProjectDir {
            name: String::from("node_modules"),
            dir_type: ProjectDirType::Dependencies,
        }]
    }

    fn get_infos(&self) -> &ProjectInfos {
        &self.infos
    }

    fn get_variants() -> Option<Vec<ProjectVariant>> {
        None
    }
}
