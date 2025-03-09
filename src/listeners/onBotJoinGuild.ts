import { Guild } from "discord.js";
import { Event } from "../structures/Event.js";
import { GuildRepository } from "../database/repositories/guildRepository.js";
import { Logger } from "../utils/logger.js";

export default class OnBotJoinGuild extends Event<"guildCreate"> {
  constructor() {
    super("guildCreate");
  }

  async execute(guild: Guild) {
    const guildInDatabase = await GuildRepository.getGuildById(guild.id);
    if (!guildInDatabase) {
      await GuildRepository.createGuild(guild.id, guild.ownerId);
      Logger.debug(`Added guild (${guild.name} - ${guild.id}) to the database`);
    }
  }
}
