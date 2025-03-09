declare module "discord.js" {
  export interface IClient {
    commands: Collection<string, Command>;
    modules: Collection<string, Module>;
  }
}

export {};
