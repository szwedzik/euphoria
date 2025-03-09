import { CommandInteraction } from "discord.js";

export const isAdmin = (interaction: CommandInteraction) => {
  return interaction.memberPermissions?.has("Administrator");
};
