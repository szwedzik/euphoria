import { Logger } from "../../utils/logger.js";
import prisma from "../prisma/prismaClient.js";

export class GuildRepository {
  static async getGuildById(guildId: string) {
    Logger.debug(`Getting guild with id ${guildId}`);
    return prisma.guild.findUnique({ where: { guildId: guildId } });
  }

  static async createGuild(guildId: string, guildOwner: string) {
    Logger.debug(`Creating guild with id ${guildId}`);

    const newGuild = await prisma.guild.create({
      data: {
        guildId: guildId,
        guildOwner: guildOwner,
        config: {
          create: {
            configs: {
              create: [
                { key: "defaultLanguage", value: "en" },
                { key: "enableLogging", value: "true" },
              ],
            },
            modules: {
              create: [
                { name: "moderation", enabled: true },
                { name: "ticketing", enabled: false },
              ],
            },
          },
        },
      },
      include: {
        config: {
          include: {
            configs: true,
            modules: true,
          },
        },
      },
    });

    Logger.debug(`Guild created: ${JSON.stringify(newGuild, null, 2)}`);
    return newGuild;
  }

  static async checkPremium(guildId: string): Promise<boolean> {
    Logger.debug(`Checking premium status for guild with id ${guildId}`);
    const premiumStatus = prisma.guild.findUnique({
      where: { guildId: guildId },
      select: { premium: true },
    });

    const status = await premiumStatus;
    return status ? status.premium : false;
  }
}
