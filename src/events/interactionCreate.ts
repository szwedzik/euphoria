import { Interaction } from "discord.js";
import { ExtendedClient } from "../structures/ExtendedClient.js";

export default (client: ExtendedClient) => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    //add check if interaction client is developer, if command is developerOnly and if interaction client is not developer, return

    //add check if interaction guild is premium, if not return with a embed saying that this feature is only available for premium servers, you can upgrade to premium at https://example.com/premium or something like that
    if (command) {
      try {
        if (interaction.isChatInputCommand()) {
          await command.execute(interaction);
        }
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error executing this command!",
          ephemeral: true,
        });
      }
    }
  });
};
