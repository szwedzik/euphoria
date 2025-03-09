import { ExtendedClient } from "./ExtendedClient.js";

export abstract class Modules {
  protected client: ExtendedClient;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  /**
   * Called when the bot starts, used to register event listeners if necessary.
   */
  abstract init(): Promise<void>;

  /**
   * Handles when a guild enables this module.
   */
  abstract onEnable(guildId: string): Promise<void>;

  /**
   * Handles when a guild disables this module.
   */
  abstract onDisable(guildId: string): Promise<void>;
}
