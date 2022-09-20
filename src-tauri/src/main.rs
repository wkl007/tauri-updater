#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

use tauri::{Manager, SystemTray, SystemTrayMenu, CustomMenuItem};

#[derive(Clone, serde::Serialize)]
struct Payload {
  args: Vec<String>,
  cwd: String,
}

fn system_tray() -> SystemTray {
  let open = CustomMenuItem::new("open".to_string(), "open");
  let quit = CustomMenuItem::new("quit".to_string(), "quit");
  let tray_menu = SystemTrayMenu::new()
    .add_item(open)
    .add_item(quit);
  let tray = SystemTray::new().with_menu(tray_menu);
  return tray;
}

fn main() {
  tauri::Builder::default()
    .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
      app.emit_all("single-instance", Payload { args: argv, cwd }).unwrap();
    }))
    .system_tray(system_tray())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
