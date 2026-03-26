import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";
import { exec } from "child_process";

// sound-play is used for Windows and Mac background playback
const sound = require("sound-play");

export function activate(context: vscode.ExtensionContext) {
  // console.log("Action Audio Thala is now active!");
  let lastPlayedTime = 0;
  const COOLDOWN_MS = 500;
  /**
   * Main function to play the sound based on the Operating System
   */
  function playFaahhSound() {
    const now = Date.now();
    if (now - lastPlayedTime < COOLDOWN_MS) {
      return; // Skip if played too recently
    }
    lastPlayedTime = now;
    const audioPath = path.join(context.extensionPath, "assets", "faahh.wav");

    // Safety check: ensure the file exists
    if (!fs.existsSync(audioPath)) {
      console.error("Audio file not found at:", audioPath);
      return;
    }

    const platform = os.platform();

    if (platform === "linux") {
      // Linux: Use 'aplay' via terminal for maximum reliability with .wav files
      // This works better than the library for Linux users
      exec(`aplay "${audioPath}"`, (error) => {
        if (error) {
          console.error("aplay failed, trying mplayer as backup:", error);
          exec(`mplayer "${audioPath}"`);
        }
      });
    } else {
      // Windows and Mac: sound-play handles these silently in the background
      sound.play(audioPath).catch((err: any) => {
        console.error("Playback error:", err);
      });
    }
  }

  // 1. REGISTER MANUAL COMMAND (Ctrl+Alt+F)
  let disposableCommand = vscode.commands.registerCommand(
    "faahh-sound.play",
    () => {
      playFaahhSound();
      vscode.window.showInformationMessage("Thala Feedback Played!");
    },
  );
  context.subscriptions.push(disposableCommand);

  // 2. REGISTER SAVE LISTENER
  let disposableSave = vscode.workspace.onDidSaveTextDocument(() => {
    // Check if Auto-Save is on. We only play sound if it's OFF
    // to avoid playing the sound every second while typing.
    const config = vscode.workspace.getConfiguration("files");
    const autoSave = config.get<string>("autoSave");

    if (autoSave === "off") {
      playFaahhSound();
    }
  });
  context.subscriptions.push(disposableSave);

  // 3. REGISTER DEBUG/RUN LISTENER
  let disposableRun = vscode.debug.onDidStartDebugSession(() => {
    playFaahhSound();
  });
  context.subscriptions.push(disposableRun);

  // 4. BREAKPOINT / STEP LISTENER
  // This triggers every time the debugger pauses (Breakpoint, Step Over, Step Into, etc.)
  let disposableStep = vscode.debug.onDidChangeActiveStackItem((e) => {
    // If e is defined, it means the debugger has stopped on a specific line
    if (e) {
      playFaahhSound();
    }
  });
  context.subscriptions.push(disposableStep);
}

export function deactivate() {}
