import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../../structures/Command.js";
import { CommandCategory } from "../../typings/Command.js";
import { GuildRepository } from "../../database/repositories/guildRepository.js";

export default class PingCommand extends Command {
  developerOnly: boolean = false;
  global: boolean = true;
  category: CommandCategory = "Moderation";
  description = "Check bot's latency";

  constructor() {
    super(
      new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Check bot's latency."),
    );
  }

  async execute(interaction: ChatInputCommandInteraction) {
    const sent = await interaction.reply({
      content: "Pinging...",
      fetchReply: true,
    });
    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    const apiLatency = interaction.client.ws.ping;

    const premium = await GuildRepository.checkPremium(interaction.guildId!);

    await interaction.editReply(
      `🏓 Pong! Latency: \`${latency}ms\` | API Latency: \`${apiLatency}ms\` | Premium: ${premium}`,
    );
  }
}
