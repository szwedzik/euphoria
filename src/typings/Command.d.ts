import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export interface ICommand {
  data: SlashCommandBuilder;
  category: string;
  description: string;
  developerOnly: boolean;
  global: boolean;
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
}

export type CommandCategory =
  | "Fun"
  | "Moderation"
  | "Utility"
  | "Developer"
  | "Misc"
  | "Music";
