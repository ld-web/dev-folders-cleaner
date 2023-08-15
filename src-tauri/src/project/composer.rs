use crate::project::ProjectDirType;

use super::{Project, ProjectDir, ProjectInfos, ProjectVariant};

#[derive(Debug, Clone, serde::Serialize)]
pub struct Composer {
    pub infos: ProjectInfos,
}

impl Project for Composer {
    fn get_folders() -> Vec<ProjectDir> {
        vec![ProjectDir {
            name: String::from("vendor"),
            dir_type: ProjectDirType::Dependencies,
        }]
    }

    fn get_infos(&self) -> &ProjectInfos {
        &self.infos
    }

    fn get_variants() -> Option<Vec<ProjectVariant>> {
        Some(vec![ProjectVariant {
            name: String::from("Symfony"),
            dirs: vec![ProjectDir {
                name: String::from("var/cache"),
                dir_type: ProjectDirType::Cache,
            }],
        }])
    }
}
