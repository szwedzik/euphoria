import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { CommandCategory, ICommand } from "../typings/Command.js";

export abstract class Command implements ICommand {
  abstract description: string;
  abstract category: CommandCategory;
  data: SlashCommandBuilder;
  abstract developerOnly: boolean;
  abstract global: boolean;
  abstract execute(interaction: ChatInputCommandInteraction): Promise<void>;

  constructor(commandData: SlashCommandBuilder) {
    this.data = commandData;
  }
}
