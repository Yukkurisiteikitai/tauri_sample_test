#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("こんにちは、{}さん!", name)
}

#[tauri::command]
fn get_message() -> String {
    "Tauri + Reactへようこそ! 🚀".to_string()
}

#[tauri::command]
fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)]
            {
                app.get_webview_window("main").unwrap().open_devtools();
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, get_message, add])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
