//! # Utils
//!
//! General purpose module

use ignore::DirEntry;

pub fn get_filenames(dir: &DirEntry) -> Option<impl Iterator<Item = String>> {
    let rd = match dir.path().read_dir() {
        Err(_e) => return None,
        Ok(rd) => rd,
    };

    Some(
        rd.filter_map(|rd| rd.ok())
            .filter(|de| de.file_type().map(|ft| ft.is_file()).unwrap_or(false))
            .filter_map(|de| de.file_name().into_string().ok()),
    )
}
