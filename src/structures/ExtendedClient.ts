import {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  REST,
  Routes,
  IClient,
} from "discord.js";
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
import { Command } from "./Command.js";
import { Modules } from "./Modules.js";
import "dotenv/config";

export class ExtendedClient extends Client implements IClient {
  public commands: Collection<string, Command> = new Collection();
  public modules: Collection<string, Modules> = new Collection();

  constructor() {
    super({
      intents: [Guilds, GuildMembers, GuildMessages],
      partials: [User, Message, GuildMember, ThreadMember],
    });
  }

  public async start() {
    console.log("Bot is starting...");
    await this.deployCommands();
    this.login(process.env.BOT_TOKEN);
  }

  private async deployCommands() {
    try {
      console.log("🌍 Deploying slash commands...");
      const rest = new REST({ version: "10" }).setToken(
        process.env.BOT_TOKEN as string,
      );

      const commands = this.commands.map((cmd) => cmd.data.toJSON());
      await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID as string),
        { body: commands },
      );

      console.log("✅ Slash commands deployed successfully!");
    } catch (error) {
      console.error("❌ Failed to deploy slash commands:", error);
    }
  }
}
