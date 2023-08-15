// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use app::{list_projects, project::Project, Error};
use dirs::home_dir;

#[tauri::command]
async fn get_home_projects() -> Result<Vec<Box<dyn Project>>, Error> {
    let home_binding = home_dir().expect("Could not get your home directory");
    let home = home_binding.as_path().to_str().unwrap();

    list_projects(home)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_home_projects])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}