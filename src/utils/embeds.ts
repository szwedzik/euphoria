import { EmbedBuilder } from "discord.js";

export const createEmbed = (title: string, description: string) => {
  return new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(0x00ae86);
};
