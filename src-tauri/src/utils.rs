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
