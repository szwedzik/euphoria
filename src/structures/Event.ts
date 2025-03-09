import { ClientEvents } from "discord.js";

export abstract class Event<Key extends keyof ClientEvents> {
  public name: Key;
  abstract execute(...args: ClientEvents[Key]): Promise<void>;

  constructor(name: Key) {
    this.name = name;
  }
}
