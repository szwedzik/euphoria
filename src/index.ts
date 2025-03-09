import "dotenv/config";
import {
  loadCommands,
  loadEventHandlers,
} from "./loaders/loadEventHandlers.js";
import { ExtendedClient } from "./structures/ExtendedClient.js";

const client = new ExtendedClient();
await loadEventHandlers(client);
await loadCommands(client);

client.start();
