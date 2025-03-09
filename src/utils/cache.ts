// import { Guild } from "discord.js";
// import prisma from "../database/prisma/prismaClient.js";

// interface GuildConfig {
//     id: string;
//     config: object;
//     penalties: object;
//     giveaways: object;
//     tickets: object;
// }

// class GuildConfigCache {
//     private cache: Map<string, { config: GuildConfig; expiresAt: number }>;
//     private ttl: number; // Time-to-live in milliseconds

//     constructor(ttl: number = 60000) {
//         this.cache = new Map();
//         this.ttl = ttl;
//     }

//     /**
//      * Fetches the latest guild config from the database.
//      */
//     private async fetchFromDatabase(guildId: string): Promise<GuildConfig | null> {
//         const guildConfig = await prisma.guild.findUnique({
//             where: { id: guildId },
//             select: { id: true, config: true, penalties: true, giveaways: true, tickets: true },
//         });

//         if (!guildConfig) return null;

//         const mappedConfig: GuildConfig = {
//             id: guildConfig.id,
//             config: guildConfig?.config,
//             penalties: guildConfig.penalties,
//             giveaways: guildConfig.giveaways,
//             tickets: guildConfig.tickets,
//         };

//         return mappedConfig;
//     }

//     /**
//      * Gets the guild config, either from cache or database.
//      */
//     public async getGuildConfig(guildId: string): Promise<GuildConfig | null> {
//         const cached = this.cache.get(guildId);

//         // If in cache and still valid, return it
//         if (cached && cached.expiresAt > Date.now()) {
//             return cached.config;
//         }

//         // Otherwise, fetch from DB and update cache
//         const guildConfig = await this.fetchFromDatabase(guildId);
//         if (guildConfig) {
//             this.cache.set(guildId, { config: guildConfig, expiresAt: Date.now() + this.ttl });
//         }

//         return guildConfig;
//     }

//     /**
//      * Updates the cache when the website modifies the guild config.
//      * This should be called via a webhook or API when an update happens.
//      */
//     public async updateGuildConfig(guildId: string) {
//         console.log(`🔄 Updating cache for Guild ${guildId}...`);

//         const updatedConfig = await this.fetchFromDatabase(guildId);
//         if (updatedConfig) {
//             this.cache.set(guildId, { config: updatedConfig, expiresAt: Date.now() + this.ttl });
//             console.log(`✅ Cache updated for Guild ${guildId}.`);
//         }
//     }

//     /**
//      * Clears the cache for a specific guild.
//      */
//     public clearGuildCache(guildId: string) {
//         this.cache.delete(guildId);
//         console.log(`🗑️ Cache cleared for Guild ${guildId}.`);
//     }
// }

// export const guildConfigCache = new GuildConfigCache();
