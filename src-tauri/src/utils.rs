//! # Utils
//!
//! General purpose module

use ignore::DirEntry;

pub enum ContentType {
    All,
    Files,
}

pub fn get_content(
    dir: &DirEntry,
    content_type: ContentType,
) -> Option<impl Iterator<Item = String>> {
    let rd = match dir.path().read_dir() {
        Err(_e) => return None,
        Ok(rd) => rd,
    };

    Some(
        rd.filter_map(|rd| rd.ok())
            .filter(move |de| {
                de.file_type()
                    .map(|ft| match content_type {
                        ContentType::All => true,
                        ContentType::Files => ft.is_file(),
                    })
                    .unwrap_or(false)
            })
            .filter_map(|de| de.file_name().into_string().ok()),
    )
}

pub fn dir_size(dir: &DirEntry) -> u64 {
    walkdir::WalkDir::new(dir.path())
        .follow_links(true)
        .same_file_system(true)
        .into_iter()
        .filter_map(|e| e.ok())
        .filter_map(|e| e.metadata().ok())
        .map(|e| e.len())
        .sum()
}
