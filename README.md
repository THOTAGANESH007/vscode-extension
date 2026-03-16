# Audio Feedback Utility

Provides immediate audible feedback for developer actions. This extension plays a notification sound ("Faahh") to confirm successful workspace events, helping to reduce the need to check the status bar for confirmation.

## Features

- **Save Confirmation**: Plays a sound automatically every time a file is saved (`Ctrl+S` / `Cmd+S`).
- **Debugging Alerts**: Triggers a sound notification the moment a Debug or Run session starts (`F5`).
- **Manual Trigger**: Use the dedicated keyboard shortcut to test audio output:
  - Windows/Linux: `Ctrl+Alt+F`
  - macOS: `Cmd+Alt+F`

## How it Works

The extension utilizes the `play-sound` library to interface with your system's native audio players (such as `afplay`, `mplayer`, or `vlc`). This ensures low latency and minimal impact on editor performance.

## Requirements

Ensure your system has a command-line audio player installed:

- **macOS**: Uses built-in `afplay`.
- **Linux**: Requires `mplayer`, `aplay`, or `mpg123`.
- **Windows**: Works natively with command-line triggers.

## Extension Settings

This extension currently uses the following commands:

- `faahh-sound.play`: Manually trigger the notification sound.

## Known Issues

- Audio may be delayed if the system is under heavy CPU load.
- Ensure system volume is turned up for the VS Code process.

## Release Notes

### 0.1.1

- Initial release with Save and Run triggers.
