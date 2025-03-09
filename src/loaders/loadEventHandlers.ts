import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { ExtendedClient } from "../structures/ExtendedClient.js";
import { Event } from "../structures/Event.js";
import { Logger } from "../utils/logger.js";
import { Command } from "../structures/Command.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Loads all event handlers, including:
 * - `client.on()` event handlers from `/events/`
 * - Class-based listeners from `/listeners/`
 */
export const loadEventHandlers = async (client: ExtendedClient) => {
  await loadFolder(client, "../events", "Event");
  await loadFolder(client, "../listeners", "Listener");
};

/**
 * Dynamically loads event files from a given folder.
 */
const loadFolder = async (
  client: ExtendedClient,
  folder: string,
  type: "Event" | "Listener",
) => {
  const folderPath = path.resolve(__dirname, folder);
  if (!fs.existsSync(folderPath)) return;

  const files = fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith(".js") && file !== "index.js");

  for (const file of files) {
    const filePath = pathToFileURL(path.join(folderPath, file)).toString();
    const module = await import(filePath);

    if (module.default) {
      if (type === "Listener") {
        const listener = new module.default() as Event<any>;
        client.on(listener.name, (...args) => listener.execute(...args));
        Logger.debug(
          `[LISTENER] Loaded ${type.toLowerCase()} ${listener.name}`,
        );
      } else {
        module.default(client);
        Logger.debug(
          `[EVENT] Loaded ${type.toLowerCase()} ${file.replace(".js", "")}`,
        );
      }
    }
  }

  Logger.debug(`Loaded ${files.length} ${type.toLowerCase()}s from ${folder}`);
};

/**
 * Recursively loads all commands from subdirectories.
 */
const getAllCommandFiles = (dir: string): string[] => {
  let results: string[] = [];
  const list = fs.readdirSync(dir);

  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(getAllCommandFiles(filePath)); // Recursively get files
    } else if (file.endsWith(".js")) {
      results.push(filePath);
    }
  }

  return results;
};

export const loadCommands = async (client: ExtendedClient) => {
  const commandsPath = path.resolve(__dirname, "../commands");
  const commandFiles = getAllCommandFiles(commandsPath); // Get all .js files recursively

  for (const file of commandFiles) {
    const commandPath = pathToFileURL(file).toString();
    const commandModule = await import(commandPath);

    if (commandModule.default) {
      const command = new commandModule.default() as Command;
      Logger.debug(`[Command]: ${command}`);
      client.commands.set(command.data.name, command);
      Logger.debug(`[Command] Loaded: ${command.data.name}`);
    }
  }

  Logger.debug(`Loaded ${commandFiles.length} commands from ../commands`);
};
