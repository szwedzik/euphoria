import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { Command } from "../../structures/Command.js";
import { CommandCategory } from "../../typings/Command.js";

export default class BanCommand extends Command {
  description: string = "Ban a member from the server.";
  category: CommandCategory = "Moderation";
  developerOnly: boolean = true;
  global: boolean = false;

  constructor() {
    super(
      new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a member from the server.")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("The user to ban.")
            .setRequired(true),
        ) // ✅ Required first
        .addNumberOption((option) =>
          option
            .setName("days")
            .setDescription("The number of days of messages to delete.")
            .setRequired(true),
        ) // ✅ Required second
        .addStringOption((option) =>
          option
            .setName("reason")
            .setDescription("The reason for banning the user."),
        ) as SlashCommandBuilder,
    );
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    interaction.reply("ban command works!");
  }
}
